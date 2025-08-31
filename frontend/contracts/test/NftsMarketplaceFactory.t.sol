// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NftsMarketplaceFactory is UtilsTest {
    address collectionBuyer = makeAddr("collection buyer");

    address nftBuyer = makeAddr("nft buyer");
    NFTsCollection boardApesCollection;

    uint256 collectionId;
    function setUp() public override {
        super.setUp();

        vm.startPrank(collectionOwner);
        collectionId = factory.createCollection("Board Apes", "BAs");
        boardApesCollection = NFTsCollection(
            payable(factory.collections(0, collectionOwner))
        );
        vm.stopPrank();

        vm.deal(collectionBuyer, 100 ether);
        vm.deal(nftBuyer, 100 ether);
    }

    modifier onlyCollectionOwner() {
        vm.startPrank(collectionOwner);
        _;
    }

    function test_BuyCollection() public onlyCollectionOwner {
        boardApesCollection.mint("first/uri", 1 ether);
        boardApesCollection.mint("seconf/uri", 5 ether);
        boardApesCollection.mint("third/uri", 10 ether);

        factory.UpdateCollectionStatus(0, 10 ether, true);

        vm.startPrank(collectionBuyer);

        factory.BuyCollection{value: 10 ether}(collectionId, collectionOwner);
        boardApesCollection.updateTokenListingStatus(0, false);
        uint256 tokenId = boardApesCollection.mint("fourth/uri", 15 ether);
        boardApesCollection.updateSaleStatus(tokenId, true);
        vm.stopPrank();

        boardApesCollection.ownerOf(tokenId);

        vm.startPrank(nftBuyer);
        boardApesCollection.buy{value: 15 ether}(tokenId);
        vm.stopPrank();

        // withdraw funds to factory
        vm.startPrank(factoryOwner);
        factory.withdrawFees();
    }
}
