// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {NFTsCollection} from "./NFTsCollection.sol";

contract NFTsMarketplaceFactory is Ownable {
    mapping(address => address) public collections;

    constructor() Ownable(msg.sender) {
        transferOwnership(msg.sender);
    }

    function createCollection(
        string calldata collectionName,
        string calldata collectionSymbol
    ) public {
        NFTsCollection collection = new NFTsCollection(
            collectionName,
            collectionSymbol,
            msg.sender
        );

        collections[msg.sender] = address(collection);
    }

    // some will come and will deploy his NFTs (collections) contract
    // This contract will have many NFTs and set prices from the owner

    // user mint NFT for a specific ETH
    // user update the price and sell it on the marketplace

    // someone who want to sell his entire collection, calculate the entire collection fee ,
    // change the fee for a specific Nft
}
