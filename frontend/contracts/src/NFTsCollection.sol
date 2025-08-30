// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import {NFTsMarketplaceFactory} from "./NFTsMarketplaceFactory.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// Every ERC-721 compliant contract must implement the ERC721 and ERC165 interfaces

contract NFTsCollection is Ownable, ReentrancyGuard, IERC165, ERC721 {
    uint256 public tokenId;
    string public baseURI = "BoardApes/";
    address payable private factoryAddress;

    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => uint256) public tokenPrice;
    mapping(uint256 => bool) private isListed;
    mapping(uint256 => bool) private isForSale;

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

    event tokenListingStatusUpdated(
        uint256 indexed tokenId,
        bool indexed status
    );

    error InsufficientETH(uint256 sent, uint256 required);
    error EmptyURINotAccepted(string uri);
    error TokenIdNotListed(uint256 id);
    error NotForSale(uint256 id);
    error OnlyFactoryAllowed(address caller);

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _factoryAddress
    ) ERC721(_name, _symbol) Ownable(_owner) {
        factoryAddress = payable(_factoryAddress);
    }

    modifier checkURI(string memory _uri) {
        if (bytes(_uri).length == 0) {
            revert EmptyURINotAccepted(_uri);
        }
        _;
    }

    modifier IsTokenExists(uint256 _tokenId) {
        if (bytes(tokenURIs[_tokenId]).length == 0) {
            revert ERC721NonexistentToken(_tokenId);
        }
        _;
    }

    modifier IsTokenListed(uint256 _tokenId) {
        if (!(isListed[_tokenId])) revert TokenIdNotListed(_tokenId);
        _;
    }

    // -> 1. Minted token A and update status with listingStatusMarketplace
    function mint(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) public onlyOwner checkURI(_tokenURI) returns (uint256) {
        _safeMint(owner(), tokenId); // mint to owner address

        tokenURIs[tokenId] = _tokenURI;
        tokenPrice[tokenId] = _tokenPrice;

        emit TokenPriceUpdated(tokenId, 0, _tokenPrice);
        tokenId++;
        return tokenId - 1;
    }

    // -> 2. List token A
    // list/or dilist on marketplace after minting
    // so transfer to marketplace

    function UpdateListingStatusForToken(
        uint256 _tokenId,
        bool _status
    ) public onlyOwner IsTokenExists(_tokenId) {
        isListed[_tokenId] = _status;
        emit tokenListingStatusUpdated(_tokenId, _status);
    }

    // @note no same URI Entered
    // mint and list at a time in one transaction
    function mintAndListOnMarketplace(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) external onlyOwner checkURI(_tokenURI) returns (uint256) {
        _safeMint(owner(), tokenId); // mint to owner

        tokenURIs[tokenId] = _tokenURI;
        tokenPrice[tokenId] = _tokenPrice;
        isListed[tokenId] = true;

        emit TokenPriceUpdated(tokenId, 0, _tokenPrice);
        emit tokenListingStatusUpdated(tokenId, true);
        tokenId++;
        return tokenId - 1;
    }

    // anyone can buy any token if it is listed and is for sale

    function buy(
        uint256 _tokenId
    ) public payable nonReentrant IsTokenExists(_tokenId) {
        uint256 requiredETH = tokenPrice[_tokenId];

        if (!isForSale[_tokenId]) revert NotForSale(_tokenId);
        else if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }

        address seller = ownerOf(_tokenId);

        uint256 sellFee = NFTsMarketplaceFactory(factoryAddress).SELL_FEE();

        uint256 marketplaceFee = (msg.value * sellFee) / 10 ** 18; //  10 * 0.03 =
        uint256 sellerAmount = msg.value - marketplaceFee;

        _safeTransfer(seller, _msgSender(), _tokenId);

        (bool success, ) = payable(seller).call{value: sellerAmount}("");
        require(success, "Payment failed");

        (bool sent, ) = payable(factoryAddress).call{value: marketplaceFee}("");
        require(sent, "sell fee payment failed");
        isForSale[_tokenId] = false; // not direclty for sale, update later
    }

    // -> Allow for sale token A

    function UpdateSaleStatus(
        uint256 _tokenId,
        bool _status
    ) external IsTokenExists(_tokenId) {
        if (ownerOf(_tokenId) != _msgSender()) {
            revert ERC721IncorrectOwner(
                _msgSender(),
                _tokenId,
                ownerOf(_tokenId)
            );
        }

        isForSale[_tokenId] = _status;
        emit TokenIdSaleStatusUpdated(_msgSender(), _tokenId, _status);
    }

    // only the holder of the token can update the price
    function updateTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        address tokenOwner = _ownerOf(_tokenId);

        if (tokenOwner == address(0)) {
            revert ERC721NonexistentToken(_tokenId);
        } else if ((tokenOwner != _msgSender())) {
            revert ERC721IncorrectOwner(_msgSender(), _tokenId, tokenOwner);
        } else {
            uint256 oldPrice = tokenPrice[_tokenId];
            tokenPrice[_tokenId] = _newPrice;

            emit TokenPriceUpdated(_tokenId, oldPrice, _newPrice);
        }
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        _requireOwned(_tokenId);
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenURIs[_tokenId])
                : "";
    }

    function updateBaseURI(
        string memory _baseURI
    ) external onlyOwner checkURI(_baseURI) {
        string memory _oldBaseURI = baseURI;
        baseURI = _baseURI;
        emit BaseURIUpdated(_oldBaseURI, baseURI);
    }

    // only called by nft marketplace factory

    modifier onlyFactory() {
        if (_msgSender() != factoryAddress) {
            revert OnlyFactoryAllowed(_msgSender());
        }
        _;
    }

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

    // mandatory
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // fallback() external payable {}
}
