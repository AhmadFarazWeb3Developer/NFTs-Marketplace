// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {NFTsCollection} from "./NFTsCollection.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTsMarketplaceFactory is Ownable, ReentrancyGuard {
    // Taking collectionId, beacuase there can be multiple collections at same addres then it will vanish oldone

    uint256 public collectionId;

    uint256 public immutable SELL_FEE = 3e16; //  charging 3% the eth amount of token

    mapping(uint256 => mapping(address => address)) public collections; // id => owner => collection
    mapping(address => address) private ownerOfCollection; // collection => owner
    mapping(uint256 => bool) public isForSale; // id => true/false
    mapping(uint256 => uint256) public collectionPrice; // id => 5 ETH

    error CollectionIsNotForSale(uint256 collectionId, address collection);
    error UnauthorizedCollectionOwner(address caller, address owner);
    error InsufficientETH(uint256 sent, uint256 required);

    event CollectionSaleStatusUpdated(
        uint256 indexed collectionId,
        address indexed by,
        bool indexed isAllowed
    );
    event CollectionPriceUpdated(
        uint256 indexed collectionId,
        uint256 indexed oldPrice,
        uint256 indexed newPrice
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
            _msgSender(),
            address(this)
        );

        collections[collectionId][_msgSender()] = address(collection);
        ownerOfCollection[address(collection)] = _msgSender();

        collectionId++;
        return collectionId - 1;
    }

    function _checkCollectionStatus(
        uint256 _collectionId,
        address _of
    ) internal {
        if (!isForSale[_collectionId]) {
            revert CollectionIsNotForSale(
                _collectionId,
                collections[_collectionId][_of]
            );
        }
    }

    function BuyCollection(
        uint256 _collectionId,
        address _of
    ) public payable nonReentrant {
        // CHECKS
        NFTsCollection collection = NFTsCollection(
            payable(collections[_collectionId][_of])
        );

        _checkCollectionStatus(_collectionId, _of);

        uint256 requiredETH = collectionPrice[_collectionId];
        if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }

        uint256 numberOfTokens = collection.balanceOf(_of);
        if (numberOfTokens == 0) {
            revert("Seller has no tokens"); // safety check
        }

        // EFFECTS

        // Calculate fees before interactions
        uint256 pricePerToken = msg.value / numberOfTokens;
        uint256 feePerToken = (pricePerToken * SELL_FEE) / 1e18;
        uint256 marketplaceFee = feePerToken * numberOfTokens;
        uint256 sellerAmount = msg.value - marketplaceFee;

        // Update storage before external calls
        collections[_collectionId][_msgSender()] = address(collection);
        delete collections[_collectionId][_of];
        ownerOfCollection[address(collection)] = _msgSender();

        // INTERACTIONS

        // Pay seller
        (bool success, ) = payable(_of).call{value: sellerAmount}("");
        require(success, "Seller payment failed");

        // rest of the amount set in the contract automatically

        // Transfer ownership of collection
        collection.transferOwnershipFromFactory(_msgSender());
    }

    // check Collection Owner
    function _validateCollectionOwner(uint256 _collectionId) internal {
        address _collection = collections[_collectionId][_msgSender()];

        NFTsCollection collection = NFTsCollection(payable(_collection));

        if (_msgSender() != ownerOfCollection[_collection]) {
            revert UnauthorizedCollectionOwner(
                _msgSender(),
                ownerOfCollection[_collection]
            );
        }
    }

    // update the price and status
    function UpdateCollectionStatus(
        uint256 _collectionId,
        uint256 _newPrice,
        bool _status
    ) external {
        _validateCollectionOwner(_collectionId);
        isForSale[_collectionId] = _status;
        uint256 _oldPrice = collectionPrice[_collectionId];

        collectionPrice[_collectionId] = _newPrice;

        emit CollectionPriceUpdated(_collectionId, _oldPrice, _newPrice);
        emit CollectionSaleStatusUpdated(_collectionId, _msgSender(), _status);
    }

    function withdrawFees() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw faild");
    }

    // Accept plain ETH only
    receive() external payable {}

    // Reject bad function selectors
    fallback() external payable {
        revert("Invalid function call");
    }
}
