// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import {NFTsMarketplaceFactory} from "./NFTsMarketplaceFactory.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// @note Every ERC-721 compliant contract must implement the ERC721 and ERC165 interfaces
contract NFTsCollection is Ownable, ReentrancyGuard, IERC165, ERC721 {
    // -----------------------------------------------------------------------
    // State Variables
    // -----------------------------------------------------------------------

    uint256 public tokenId; // keep track record of tokens
    string public baseURI = "BoardApes/"; // used by IPFS
    address payable private factoryAddress; // used for fee and ownership transfer

    mapping(uint256 => string) private tokenURIs; // id => uri
    mapping(uint256 => uint256) public tokenPrice;
    mapping(uint256 => bool) private isListed; // listed/unlisted on marketplace (UI purpose)
    mapping(uint256 => bool) private isForSale; // whether token is for sale

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

    event TokenPriceUpdated(
        uint256 indexed tokenID,
        uint256 indexed oldPrice,
        uint256 indexed newPrice
    );

    event BaseURIUpdated(string indexed oldBaseURI, string indexed newBaseURI);

    event TokenIdSaleStatusUpdated(
        address indexed updatedBy,
        uint256 indexed tokenID,
        bool indexed isAllowed
    );

    event TokenListingStatusUpdated(
        uint256 indexed tokenId,
        bool indexed status
    );

    event TokenBought(
        address indexed buyer,
        address indexed seller,
        uint256 indexed tokenId,
        uint256 price
    );

    // -----------------------------------------------------------------------
    // Errors
    // -----------------------------------------------------------------------

    error InsufficientETH(uint256 sent, uint256 required);
    error EmptyURINotAccepted(string uri);
    error TokenIdNotListed(uint256 id);
    error NotForSale(uint256 id);
    error OnlyFactoryAllowed(address caller);

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    /**
     * @param _name Name of the collection
     * @param _symbol Symbol of the collection
     * @param _owner Address of the collection owner
     * @param _factoryAddress Address of the NFTsMarketplaceFactory
     */
    constructor(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _factoryAddress
    ) ERC721(_name, _symbol) Ownable(_owner) {
        factoryAddress = payable(_factoryAddress);
    }

    // -----------------------------------------------------------------------
    // Modifiers
    // -----------------------------------------------------------------------

    modifier checkURI(string memory _uri) {
        if (bytes(_uri).length == 0) {
            revert EmptyURINotAccepted(_uri);
        }
        _;
    }

    modifier isTokenExists(uint256 _tokenId) {
        _requireOwned(_tokenId);
        _;
    }

    modifier isTokenListed(uint256 _tokenId) {
        if (!(isListed[_tokenId])) revert TokenIdNotListed(_tokenId);
        _;
    }

    modifier onlyTokenOwner(uint256 _tokenId) {
        address tokenOwner = _ownerOf(_tokenId);
        if (tokenOwner != _msgSender()) {
            revert ERC721IncorrectOwner(_msgSender(), _tokenId, tokenOwner);
        }
        _;
    }
    modifier onlyFactory() {
        if (_msgSender() != factoryAddress) {
            revert OnlyFactoryAllowed(_msgSender());
        }
        _;
    }

    // -----------------------------------------------------------------------
    // Core Minting
    // -----------------------------------------------------------------------

    /**
     * @param _tokenURI comes from IPFS
     * @param _tokenPrice initial price of token
     * @return tokenId
     */
    function mint(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) public onlyOwner checkURI(_tokenURI) returns (uint256) {
        _safeMint(owner(), tokenId);

        tokenURIs[tokenId] = _tokenURI;
        updateTokenPrice(tokenId, _tokenPrice);

        tokenId++;
        return tokenId - 1;
    }

    /**
     * @notice no same URI Entered
     * Mint and list at a time in one transaction
     *
     * @param _tokenURI uri from IPFS
     * @param _tokenPrice initial price
     * @return tokenId
     */
    function mintAndListOnMarketplace(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) external onlyOwner checkURI(_tokenURI) returns (uint256) {
        _safeMint(owner(), tokenId);

        tokenURIs[tokenId] = _tokenURI;
        updateTokenPrice(tokenId, _tokenPrice);
        updateTokenListingStatus(tokenId, true);

        tokenId++;
        return tokenId - 1;
    }

    // -----------------------------------------------------------------------
    // Marketplace
    // -----------------------------------------------------------------------

    /**
     * @param _tokenId which id to list/delist
     * @param _status true/false
     */
    function updateTokenListingStatus(
        uint256 _tokenId,
        bool _status
    ) public onlyOwner isTokenExists(_tokenId) {
        isListed[_tokenId] = _status;
        emit TokenListingStatusUpdated(_tokenId, _status);
    }

    /**
     * Anyone can buy any token if isForSale is true
     *
     * @param _tokenId enter token id to buy
     */
    function buy(
        uint256 _tokenId
    ) public payable nonReentrant isTokenExists(_tokenId) {
        uint256 requiredETH = tokenPrice[_tokenId];

        // -------- Checks --------
        if (!isForSale[_tokenId]) revert NotForSale(_tokenId);
        if (msg.value < requiredETH)
            revert InsufficientETH(msg.value, requiredETH);

        address seller = ownerOf(_tokenId);

        uint256 sellFee = NFTsMarketplaceFactory(factoryAddress).SELL_FEE();
        uint256 marketplaceFee = (msg.value * sellFee) / 1e18;
        uint256 sellerAmount = msg.value - marketplaceFee;

        // -------- Effects --------
        updateSaleStatus(_tokenId, false);

        // -------- Interactions --------
        _safeTransfer(seller, _msgSender(), _tokenId);

        (bool success, ) = payable(seller).call{value: sellerAmount}("");
        require(success, "Payment to seller failed");

        (bool sent, ) = payable(factoryAddress).call{value: marketplaceFee}("");
        require(sent, "Payment of fee failed");
        emit TokenBought(_msgSender(), seller, _tokenId, requiredETH);
    }

    /**
     * Update the sale token price and sale status
     */

    function updateSaleStatus(
        uint256 _tokenId,
        bool _status
    ) public isTokenExists(_tokenId) onlyTokenOwner(_tokenId) {
        isForSale[_tokenId] = _status;
        emit TokenIdSaleStatusUpdated(_msgSender(), _tokenId, _status);
    }
    /**
     * update token price
     */
    function updateTokenPrice(
        uint256 _tokenId,
        uint256 _newPrice
    ) public isTokenExists(_tokenId) onlyTokenOwner(_tokenId) {
        uint256 oldPrice = tokenPrice[_tokenId];
        tokenPrice[_tokenId] = _newPrice;
        emit TokenPriceUpdated(_tokenId, oldPrice, _newPrice);
    }

    // -----------------------------------------------------------------------
    // Metadata
    // -----------------------------------------------------------------------

    /**
     * @notice Returns the metadata URI for a given token ID.
     * @dev Uses the `baseURI` + `tokenURIs[_tokenId]` if `baseURI` is set.
     *      Reverts if the token does not exist.
     * @param _tokenId The ID of the token whose URI is being queried.
     * @return The full token metadata URI.
     */

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        _requireOwned(_tokenId);
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenURIs[_tokenId])
                : "";
    }

    /**
     * @notice Updates the base URI for all tokens in this collection.
     * @dev Can only be called by the contract owner.
     *      Ensures the new URI is not empty through `checkURI` modifier.
     * @param _baseURI The new base URI to be set.
     *
     * Emits a {BaseURIUpdated} event.
     */
    function updateBaseURI(
        string memory _baseURI
    ) external onlyOwner checkURI(_baseURI) {
        string memory _oldBaseURI = baseURI;
        baseURI = _baseURI;
        emit BaseURIUpdated(_oldBaseURI, baseURI);
    }

    // -----------------------------------------------------------------------
    // Factory Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Transfers contract ownership and all tokens owned by the current owner to a new owner.
     * @dev Can only be called by the factory contract (`onlyFactory`), when this collection is sold to new owner
     *      Iterates through all minted token IDs and transfers those owned by the current owner.
     * @param _newOwner The address that will become the new owner of the contract and tokens.
     */

    function transferOwnershipFromFactory(
        address _newOwner
    ) external onlyFactory {
        address currentOwner = owner();
        uint256 maxLength = tokenId;

        for (uint256 id = 0; id < maxLength; id++) {
            if (ownerOf(id) == currentOwner) {
                _safeTransfer(currentOwner, _newOwner, id);
            }
        }

        _transferOwnership(_newOwner);
    }

    // -----------------------------------------------------------------------
    // ERC721 Receiver
    // -----------------------------------------------------------------------

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // -----------------------------------------------------------------------
    // Fallbacks
    // -----------------------------------------------------------------------

    receive() external payable {}

    fallback() external payable {
        revert("Invalid function call");
    }
}
