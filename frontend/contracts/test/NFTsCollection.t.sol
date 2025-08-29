// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {UtilsTest} from "./Utils.t.sol";
import {NFTsCollection} from "../src/NFTsCollection.sol";

contract NFTsCollectionTest is UtilsTest {
    address buyer = makeAddr("buyer");

    NFTsCollection boardApesCollection;

    function setUp() public override {
        super.setUp();

        // create collection
        vm.startPrank(collectionOwner);
        factory.createCollection("Board Apes", "BAs");
        boardApesCollection = NFTsCollection(
            factory.collections(collectionOwner)
        );
        vm.stopPrank();
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
        uint256 tokenId = boardApesCollection.mintAndListOnMarketplace(
            "first/uri",
            1 ether
        );

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
        boardApesCollection.listOnMarketplace(tokenId);
        // allow for sale
        boardApesCollection.allowForSale(tokenId);

        vm.deal(buyer, 10 ether);
        vm.startPrank(buyer);
        boardApesCollection.buy{value: 1 ether}(tokenId);
        vm.stopPrank();

        boardApesCollection.balanceOf(buyer);
        boardApesCollection.tokenURI(tokenId);

        assertEq(boardApesCollection.ownerOf(tokenId), buyer);
    }

    function test_diListFromMarketplace() public onlyCollectionOwner {
        uint256 tokenId = boardApesCollection.mint("first/uri", 1 ether);
        boardApesCollection.diListFromMarketplace(tokenId);

        // cannot buy after dilisting

        vm.deal(buyer, 10 ether);
        vm.startPrank(buyer);
        vm.expectRevert(
            abi.encodeWithSelector(
                NFTsCollection.TokenIdNotListed.selector,
                tokenId
            )
        );
        boardApesCollection.buy{value: 1 ether}(tokenId);
        vm.stopPrank();
    }

    function test_updateTokenPrice() public onlyCollectionOwner {
        boardApesCollection.updateTokenPrice(0, 10 ether);
    }
}
