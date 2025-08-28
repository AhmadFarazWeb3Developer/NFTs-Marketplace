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
    mapping(uint256 => string) public tokenURIs;
    mapping(uint256 => uint256) public tokenPrice;

    event TokenPriceUpdated(uint256 TokenID, uint256 TokenPrice);

    error InsufficientETH(uint256 sent, uint256 required);

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    ) ERC721(_name, _symbol) Ownable(_owner) {}

    function mint(
        string memory _tokenURI,
        uint256 _tokenPrice
    ) public onlyOwner returns (uint256) {
        _safeMint(address(this), tokenId);
        tokenURIs[tokenId] = _tokenURI;
        tokenPrice[tokenId] = _tokenPrice;
        emit TokenPriceUpdated(tokenId, _tokenPrice);
        tokenId++;
        return tokenId - 1;
    }

    function buy(uint256 _tokenId) public payable returns (uint256) {
        uint256 requiredETH = tokenPrice[_tokenId];
        if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }
        _safeTransfer(address(this), msg.sender, _tokenId);
    }

    // function sell()

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
