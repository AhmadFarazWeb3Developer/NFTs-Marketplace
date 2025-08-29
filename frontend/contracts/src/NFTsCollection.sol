// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Every ERC-721 compliant contract must implement the ERC721 and ERC165 interfaces

contract NFTsCollection is Ownable, IERC165, ERC721 {
    uint256 public tokenId;
    string public baseURI = "BoardApes/";

    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => uint256) public tokenPrice;
    mapping(uint256 => bool) private isListed;
    mapping(uint256 => bool) private isForSale;

    event TokenPriceUpdated(
        uint256 TokenID,
        uint256 OldPrice,
        uint256 NewPrice
    );
    event BaseURIUpdated(string OldBaseURI, string NewBaseURI);

    event TokenIdSaleUpdated(
        address UpdatedBy,
        uint256 TokenID,
        bool IsAllowed
    );

    error InsufficientETH(uint256 Sent, uint256 Required);
    error EmptyURINotAccepted(string uri);
    error TokenIdNotListed(uint256 id);
    error NotForSale(uint256 id);

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    ) ERC721(_name, _symbol) Ownable(_owner) {}

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

    // -> 1. Minted token A
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
    // list on marketplace after minting
    // so transfer to marketplace
    function listOnMarketplace(
        uint256 _tokenId
    ) public onlyOwner IsTokenExists(_tokenId) {
        isListed[_tokenId] = true;
    }

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
        tokenId++;
        return tokenId - 1;
    }

    // check onlyOwner
    // check URI
    // mint to marketplace

    // check tokenId exists
    // check tokenId is listed
    // check tokenId is for sale
    // check the msg.value

    // anyone can buy any token if it is listed and is for sale

    function buy(uint256 _tokenId) public payable IsTokenExists(_tokenId) {
        uint256 requiredETH = tokenPrice[_tokenId];

        // if (!isListed[_tokenId]) revert TokenIdNotListed(_tokenId);
        if (!isForSale[_tokenId]) revert NotForSale(_tokenId);
        else if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }

        _safeTransfer(ownerOf(_tokenId), msg.sender, _tokenId);
    }

    // -> Allow for sale token A
    function allowForSale(
        uint256 _tokenId
    ) public IsTokenListed(_tokenId) IsTokenExists(_tokenId) {
        if (ownerOf(_tokenId) != _msgSender()) {
            revert ERC721IncorrectOwner(
                _msgSender(),
                _tokenId,
                ownerOf(_tokenId)
            );
        }

        isForSale[_tokenId] = true;
        emit TokenIdSaleUpdated(_msgSender(), _tokenId, true);
    }

    // -> Disallow for sale token A
    function disAllowForSale(uint256 _tokenId) public IsTokenExists(_tokenId) {
        if (ownerOf(_tokenId) != _msgSender()) {
            revert ERC721IncorrectOwner(
                _msgSender(),
                _tokenId,
                ownerOf(_tokenId)
            );
        }
        isForSale[_tokenId] = false;
        emit TokenIdSaleUpdated(_msgSender(), _tokenId, false);
    }

    function diListFromMarketplace(
        uint256 _tokenId
    ) public onlyOwner IsTokenExists(_tokenId) {
        isListed[_tokenId] = false;
    }

    // only the holder of the token can update the price , marketplace cannot update the price

    // if the marketplace want to update the price it must dilist first and become the owner

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
        // string memory uri = ;
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

    // mandatory
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
