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
     * @param  name Name of the collection
     * @param  symbol Symbol of the collection
     * @param _owner Address of the collection owner
     * @param _factoryAddress Address of the NFTsMarketplaceFactory
     */
    constructor(
        string memory name,
        string memory symbol,
        address _owner,
        address _factoryAddress
    ) ERC721(name, symbol) Ownable(_owner) {
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

    modifier isTokenExists(uint256 tokenId_) {
        _requireOwned(tokenId_);
        _;
    }

    modifier isTokenListed(uint256 tokenId_) {
        if (!(isListed[tokenId_])) revert TokenIdNotListed(tokenId_);
        _;
    }

    modifier onlyTokenOwner(uint256 tokenId_) {
        address tokenOwner = _ownerOf(tokenId_);
        if (tokenOwner != _msgSender()) {
            revert ERC721IncorrectOwner(_msgSender(), tokenId_, tokenOwner);
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
     * @param tokenURI_ comes from IPFS
     * @param tokenPrice_ initial price of token
     * @return tokenId
     */
    function mint(
        string memory tokenURI_,
        uint256 tokenPrice_
    ) public onlyOwner checkURI(tokenURI_) nonReentrant returns (uint256) {
        uint256 newId = tokenId;

        // Mint first
        _safeMint(owner(), newId);

        // Set metadata and price
        tokenURIs[newId] = tokenURI_;
        updateTokenPrice(newId, tokenPrice_);

        tokenId++;

        return newId;
    }

    /**
     * @notice no same URI Entered
     * Mint and list at a time in one transaction
     *
     * @param tokenURI_ uri from IPFS
     * @param tokenPrice_ initial price
     * @return tokenId
     */
    function mintAndListOnMarketplace(
        string memory tokenURI_,
        uint256 tokenPrice_
    ) external onlyOwner checkURI(tokenURI_) returns (uint256) {
        _safeMint(owner(), tokenId);

        tokenURIs[tokenId] = tokenURI_;
        updateTokenPrice(tokenId, tokenPrice_);
        updateTokenListingStatus(tokenId, true);

        tokenId++;
        return tokenId - 1;
    }

    // -----------------------------------------------------------------------
    // Marketplace
    // -----------------------------------------------------------------------

    /**
     * @param tokenId_ which id to list/delist
     * @param status_ true/false
     */
    function updateTokenListingStatus(
        uint256 tokenId_,
        bool status_
    ) public onlyOwner isTokenExists(tokenId_) {
        isListed[tokenId_] = status_;
        emit TokenListingStatusUpdated(tokenId_, status_);
    }

    /**
     * Anyone can buy any token if isForSale is true
     *
     * @param tokenId_ enter token id to buy
     */
    function buy(
        uint256 tokenId_
    ) public payable nonReentrant isTokenExists(tokenId_) {
        uint256 requiredETH = tokenPrice[tokenId_];

        // -------- Checks --------
        if (!isForSale[tokenId_]) revert NotForSale(tokenId_);
        if (msg.value < requiredETH)
            revert InsufficientETH(msg.value, requiredETH);

        address seller = ownerOf(tokenId_);

        uint256 sellFee = NFTsMarketplaceFactory(factoryAddress).SELL_FEE();
        uint256 marketplaceFee = (msg.value * sellFee) / 1e18;
        uint256 sellerAmount = msg.value - marketplaceFee;

        // -------- Effects --------

        isForSale[tokenId_] = false; // disable instant sell, depends on business logic
        emit TokenIdSaleStatusUpdated(_msgSender(), tokenId_, false);

        // -------- Interactions --------
        _safeTransfer(seller, _msgSender(), tokenId_);

        (bool success, ) = payable(seller).call{value: sellerAmount}("");
        require(success, "Payment to seller failed");

        (bool sent, ) = payable(factoryAddress).call{value: marketplaceFee}("");
        require(sent, "Payment of fee failed");
        emit TokenBought(_msgSender(), seller, tokenId_, requiredETH);
    }

    /**
     * Update the sale token price and sale status
     */

    function updateSaleStatus(
        uint256 tokenId_,
        bool status_
    ) public isTokenExists(tokenId_) onlyTokenOwner(tokenId_) {
        isForSale[tokenId_] = status_;
        emit TokenIdSaleStatusUpdated(_msgSender(), tokenId_, status_);
    }
    /**
     * update token price
     */
    function updateTokenPrice(
        uint256 tokenId_,
        uint256 newPrice_
    ) public isTokenExists(tokenId_) onlyTokenOwner(tokenId_) {
        uint256 oldPrice = tokenPrice[tokenId_];
        tokenPrice[tokenId_] = newPrice_;
        emit TokenPriceUpdated(tokenId_, oldPrice, newPrice_);
    }

    // -----------------------------------------------------------------------
    // Metadata
    // -----------------------------------------------------------------------

    /**
     * @notice Returns the metadata URI for a given token ID.
     * @dev Uses the `baseURI` + `tokenURIs[_tokenId]` if `baseURI` is set.
     *      Reverts if the token does not exist.
     * @param tokenId_ The ID of the token whose URI is being queried.
     * @return The full token metadata URI.
     */

    function tokenURI(
        uint256 tokenId_
    ) public view override returns (string memory) {
        _requireOwned(tokenId_);
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenURIs[tokenId_])
                : "";
    }

    /**
     * @notice Updates the base URI for all tokens in this collection.
     * @dev Can only be called by the contract owner.
     *      Ensures the new URI is not empty through `checkURI` modifier.
     * @param baseURI_ The new base URI to be set.
     *
     * Emits a {BaseURIUpdated} event.
     */
    function updateBaseURI(
        string memory baseURI_
    ) external onlyOwner checkURI(baseURI_) {
        string memory _oldBaseURI = baseURI;
        baseURI = baseURI_;
        emit BaseURIUpdated(_oldBaseURI, baseURI);
    }

    // -----------------------------------------------------------------------
    // Factory Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Transfers contract ownership and all tokens owned by the current owner to a new owner.
     * @dev Can only be called by the factory contract (`onlyFactory`), when this collection is sold to new owner
     *      Iterates through all minted token IDs and transfers those owned by the current owner.
     * @param newOwner_ The address that will become the new owner of the contract and tokens.
     */

    function transferOwnershipFromFactory(
        address newOwner_
    ) external onlyFactory {
        address currentOwner = owner();
        uint256 maxLength = tokenId;

        for (uint256 id = 0; id < maxLength; id++) {
            if (ownerOf(id) == currentOwner) {
                _safeTransfer(currentOwner, newOwner_, id);
            }
        }

        _transferOwnership(newOwner_);
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
