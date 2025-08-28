// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
contract NftsMarketplaceFactory is UtilsTest {
    function setUp() public override {
        super.setUp();
    }

    modifier onlyCollectionOwner() {
        vm.startPrank(collectionOwner);
        _;
    }

    function test_createCollection() public onlyCollectionOwner {
        factory.createCollection("Board Apes", "BAs");
    }
}
