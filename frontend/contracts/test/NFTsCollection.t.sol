// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NFTsCollectionTest is UtilsTest {
    address buyer = makeAddr("buyer");

    NFTsCollection boardApesCollection;

    function setUp() public override {
        super.setUp();

        // owner create collection
        vm.startPrank(collectionOwner);
        factory.createCollection("Board Apes", "BAs");
        boardApesCollection = NFTsCollection(
            payable(factory.collections(0, collectionOwner))
        );
        vm.stopPrank();

        vm.deal(buyer, 10 ether);
    }

    modifier onlyCollectionOwner() {
        vm.startPrank(collectionOwner);
        _;
    }

    function test_mint() public onlyCollectionOwner {
        // Enter tokenURI for new NFT
        boardApesCollection.mint("first/uri", 1 ether);
        boardApesCollection.mint("second/uri", 2 ether);
        boardApesCollection.mint("third/uri", 1.5 ether);
        boardApesCollection.mint("fourth/uri", 0.5 ether);
    }

    function test_mintAndListOnMarketplace() public onlyCollectionOwner {
        // mint and list
        uint256 tokenId = boardApesCollection.mintAndListOnMarketplace(
            "first/uri",
            1 ether
        );

        // allow for sale
        boardApesCollection.updateSaleStatus(tokenId, true);

        vm.deal(buyer, 10 ether);
        vm.startPrank(buyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);
        vm.stopPrank();

        boardApesCollection.balanceOf(buyer);
        boardApesCollection.tokenURI(tokenId);

        assertEq(boardApesCollection.ownerOf(tokenId), buyer);
    }

    function test_buy() public onlyCollectionOwner {
        // Enter tokenURI for new NFT
        uint256 tokenId = boardApesCollection.mint("first/uri", 1 ether);
        // list on exchange
        boardApesCollection.updateTokenListingStatus(tokenId, true);
        // allow for sale
        boardApesCollection.updateSaleStatus(tokenId, true);

        vm.deal(buyer, 10 ether);

        vm.startPrank(buyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);
        vm.stopPrank();

        assertEq(boardApesCollection.ownerOf(tokenId), buyer);
    }

    function test_UpdateTokenListingStatus() public onlyCollectionOwner {
        uint256 tokenId = boardApesCollection.mint("first/uri", 1 ether);
        // list on marketplace
        boardApesCollection.updateTokenListingStatus(tokenId, true);

        // allowed for sale
        boardApesCollection.updateSaleStatus(tokenId, true);

        vm.deal(buyer, 10 ether);
        vm.startPrank(buyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);
        boardApesCollection.updateSaleStatus(tokenId, true);
        vm.stopPrank();

        // now marketplace dilist the token but the cannot stop from selling
        vm.startPrank(collectionOwner);
        boardApesCollection.updateTokenListingStatus(tokenId, false);
        vm.stopPrank();

        // new user come and want to buy the tokenId 0
        address newBuyer = makeAddr("new buyer");

        vm.deal(newBuyer, 10 ether);
        vm.startPrank(newBuyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);

        vm.stopPrank();
    }

    function test_updateTokenPrice() public onlyCollectionOwner {
        uint256 tokenId = boardApesCollection.mintAndListOnMarketplace(
            "first/uri",
            5 ether
        );

        boardApesCollection.updateSaleStatus(tokenId, true);
        boardApesCollection.updateTokenPrice(tokenId, 10 ether);

        vm.startPrank(buyer);
        uint256 tokenPrice = boardApesCollection.tokenPrice(tokenId);
        boardApesCollection.buy{value: tokenPrice}(tokenId);
        boardApesCollection.updateTokenPrice(tokenId, 15 ether);
        boardApesCollection.updateSaleStatus(tokenId, true);
        vm.stopPrank();

        // new buyer came and want to buy after token price update
        address newBuyer = makeAddr("new buyer");

        vm.deal(newBuyer, 15 ether);
        vm.startPrank(newBuyer);

        boardApesCollection.buy{value: 15 ether}(tokenId);
    }

    function test_tokenURI() public onlyCollectionOwner {
        uint256 tokenId = boardApesCollection.mintAndListOnMarketplace(
            "first/uri",
            5 ether
        );
        boardApesCollection.tokenURI(tokenId);
    }

    function test_updateBaseURI() public onlyCollectionOwner {
        uint256 tokenId = boardApesCollection.mintAndListOnMarketplace(
            "first/uri",
            5 ether
        );

        boardApesCollection.tokenURI(tokenId);

        boardApesCollection.updateBaseURI("ActiveApes/");

        tokenId = boardApesCollection.mintAndListOnMarketplace(
            "second/uri",
            10 ether
        );

        boardApesCollection.tokenURI(tokenId);
    }
}
