// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {NFTsMarketplaceFactory} from "../src/NFTsMarketplaceFactory.sol";

abstract contract UtilsTest is Test {
    NFTsMarketplaceFactory factory;

    address factoryOwner = makeAddr("factoryOnwer");
    address collectionOwner = makeAddr("collectionOwer");

    function setUp() public virtual {
        vm.startPrank(factoryOwner);
        factory = new NFTsMarketplaceFactory();
        vm.stopPrank();
    }
}
