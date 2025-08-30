// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NftsMarketplaceFactory is UtilsTest {
    address collectionBuyer = makeAddr("collection buyer");

    NFTsCollection boardApesCollection;

    function setUp() public override {
        super.setUp();

        vm.startPrank(collectionOwner);
        factory.createCollection("Board Apes", "BAs");
        boardApesCollection = NFTsCollection(
            factory.collections(0, collectionOwner)
        );
        vm.stopPrank();
    }

    modifier onlyCollectionOwner() {
        vm.startPrank(collectionOwner);
        _;
    }
    function test_BuyHisCollection() public onlyCollectionOwner {
        boardApesCollection.mint("first/uri", 1 ether);
        boardApesCollection.mint("seconf/uri", 5 ether);
        boardApesCollection.mint("third/uri", 10 ether);

        boardApesCollection.setFactoryAddress(address(factory));

        factory.UpdateCollectionSaleStatus(0, true);

        vm.startPrank(collectionBuyer);
        factory.BuyHisCollection(0, collectionOwner);
    }
}
