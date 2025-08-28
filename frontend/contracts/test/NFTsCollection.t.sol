// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NFTsCollectionTest is UtilsTest {
    address buyer = makeAddr("buyer");
    function setUp() public override {
        super.setUp();
    }

    modifier onlyCollectionOwner() {
        vm.startPrank(collectionOwner);
        _;
    }

    function test_mint() public onlyCollectionOwner {
        factory.createCollection("Board Apes", "BAs");

        // get collection contract
        NFTsCollection boardApesCollection = NFTsCollection(
            factory.collections(collectionOwner)
        );

        // Enter tokenURI for new NFT
        boardApesCollection.mint("URI One", 1 ether);
        boardApesCollection.mint("URI Two", 2 ether);
        boardApesCollection.mint("URI Three", 1.5 ether);
        boardApesCollection.mint("URI Four", 0.5 ether);
    }

    function test_buy() public onlyCollectionOwner {
        factory.createCollection("Board Apes", "BAs");

        // get collection contract
        NFTsCollection boardApesCollection = NFTsCollection(
            factory.collections(collectionOwner)
        );

        // Enter tokenURI for new NFT
        uint256 tokenId = boardApesCollection.mint("URI One", 1 ether);

        vm.deal(buyer, 10 ether);
        vm.startPrank(buyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);
        vm.stopPrank();

        boardApesCollection.balanceOf(buyer);
        boardApesCollection.name();
    }
}
