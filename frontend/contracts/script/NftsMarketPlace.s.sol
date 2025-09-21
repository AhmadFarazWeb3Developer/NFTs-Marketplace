// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {NFTsMarketplaceFactory} from "../src/NFTsMarketplaceFactory.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NFTsMarketplace is Script {

    function run() public {
        NFTsMarketplaceFactory factory;

        vm.startBroadcast();

        factory = new NFTsMarketplaceFactory();

        vm.stopBroadcast();
    }
}
