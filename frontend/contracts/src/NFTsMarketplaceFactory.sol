// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {NFTsCollection} from "./NFTsCollection.sol";

contract NFTsMarketplaceFactory is Ownable {
    mapping(uint256 => mapping(address => address)) public collections; // id => owner => collection
    mapping(address => address) private ownerOfCollection; // collection => owner
    mapping(uint256 => bool) public isForSale; // id => true/false

    // we are taking id beacuase there can be multiple collections at same addres then it will vanish oldone
    uint256 public collectionId;

    error CollectionIsNotForSale(uint256 collectionId, address collection);
    error UnauthorizedCollectionOwner(address caller, address owner);

    event CollectionSaleStatusUpdated(
        uint256 indexed collectionId,
        address indexed by,
        bool indexed isAllowed
    );

    constructor() Ownable(_msgSender()) {
        transferOwnership(_msgSender());
    }

    function createCollection(
        string calldata collectionName,
        string calldata collectionSymbol
    ) public returns (uint256) {
        NFTsCollection collection = new NFTsCollection(
            collectionName,
            collectionSymbol,
            _msgSender()
        );

        collections[collectionId][_msgSender()] = address(collection);
        ownerOfCollection[address(collection)] = _msgSender();

        collectionId++;
        return collectionId - 1;
    }

    // some will come and will deploy his NFTs (collections) contract
    // This contract will have many NFTs and set prices from the owner

    // user mint NFT for a specific ETH
    // user update the price and sell it on the marketplace

    // someone who want to sell his entire collection, calculate the entire collection fee ,

    function BuyHisCollection(
        uint256 _collectionId,
        address _of
    ) public payable {
        // changes should reflect on storage

        NFTsCollection collection = NFTsCollection(
            collections[_collectionId][_of]
        );

        if (!isForSale[_collectionId]) {
            revert CollectionIsNotForSale(
                _collectionId,
                collections[_collectionId][_of]
            );
        }

        uint256 ownerBalance = collection.balanceOf(_of);

        // collection.transferOwnership(_msgSender());
        collection.transferOwnershipFromFactory(_msgSender());
    }

    function UpdateCollectionSaleStatus(
        uint256 _collectionId,
        bool _status
    ) public {
        address _collection = collections[_collectionId][_msgSender()];
        NFTsCollection collection = NFTsCollection(_collection);

        if (_msgSender() != ownerOfCollection[_collection]) {
            revert UnauthorizedCollectionOwner(
                _msgSender(),
                ownerOfCollection[_collection]
            );
        }

        isForSale[_collectionId] = _status;
        emit CollectionSaleStatusUpdated(_collectionId, _msgSender(), _status);
    }


    // function _checkDeposits(address _to) internal {}

    // function depositFor

    // MarketPlace revenue model ?
    // cut dieclty or cut from each NFT sell ?

    // change the fee for a specific Nft
}
