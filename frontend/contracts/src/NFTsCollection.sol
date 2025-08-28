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

    event TokenPriceUpdated(
        uint256 TokenID,
        uint256 OldPrice,
        uint256 NewPrice
    );

    event BaseURIUpdated(string OldBaseURI, string NewBaseURI);

    error InsufficientETH(uint256 Sent, uint256 Required);
    error EmptyURINotAccepted(string uri);
    // error TokenIdDoesNotExists(uint256 id);
    // error UnAuthorized(uint256 id);

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

    function mint(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) public onlyOwner checkURI(_tokenURI) returns (uint256) {
        _safeMint(address(this), tokenId);

        tokenURIs[tokenId] = _tokenURI;
        tokenPrice[tokenId] = _tokenPrice;

        emit TokenPriceUpdated(tokenId, 0, _tokenPrice);
        tokenId++;
        return tokenId - 1;
    }

    function buy(uint256 _tokenId) public payable {
        uint256 requiredETH = tokenPrice[_tokenId];
        if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }
        _safeTransfer(address(this), msg.sender, _tokenId);
    }

    // function sell()

    // only the holder of the token can update the price
    function updateTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        address owner = _ownerOf(_tokenId);

        if (owner == address(0)) {
            revert ERC721NonexistentToken(_tokenId);
        } else if (owner != msg.sender) {
            revert ERC721IncorrectOwner(msg.sender, _tokenId, owner);
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
        string memory _oldBaseURI = _baseURI;
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
