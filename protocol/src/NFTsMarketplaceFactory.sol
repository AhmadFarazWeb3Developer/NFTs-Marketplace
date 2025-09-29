// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {NFTsCollection} from "./NFTsCollection.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTsMarketplaceFactory is Ownable, ReentrancyGuard {
    // -----------------------------------------------------------------------
    // State Variables
    // -----------------------------------------------------------------------

    uint256 public collectionId;
    uint256 public immutable SELL_FEE = 3e16; // 3% fee

    mapping(uint256 => mapping(address => address)) public collections; // id => owner => collection
    mapping(address => address) private ownerOfCollection; // collection => owner
    mapping(uint256 => bool) public isForSale; // id => true/false
    mapping(uint256 => uint256) public collectionPrice; // id => price in ETH
    mapping(address => uint256) public collectionAddressToId;

    // -----------------------------------------------------------------------
    // Errors
    // -----------------------------------------------------------------------

    error CollectionIsNotForSale(uint256 collectionId, address collection);
    error UnauthorizedCollectionOwner(address caller, address owner);
    error InsufficientETH(uint256 sent, uint256 required);

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

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

    event CollectionCreated(
        uint256 indexed collectionId,
        address indexed owner,
        address collectionAddress
    );

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    /** Initialize marketplace and set owner */
    constructor() Ownable(_msgSender()) {
        transferOwnership(_msgSender());
    }

    // -----------------------------------------------------------------------
    // External / Public Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Create a new NFTsCollection
     * @param collectionName_ name of collection
     * @param collectionSymbol_ symbol of collection
     * @return collection id
     */
    function createCollection(
        string calldata collectionName_,
        string calldata collectionSymbol_
    ) public returns (uint256) {
        NFTsCollection collection = new NFTsCollection(
            collectionName_,
            collectionSymbol_,
            _msgSender(),
            address(this)
        );

        collectionAddressToId[address(collection)] = collectionId;
        collections[collectionId][_msgSender()] = address(collection);
        ownerOfCollection[address(collection)] = _msgSender();

        collectionId++;

        emit CollectionCreated(
            collectionId - 1,
            _msgSender(),
            address(collection)
        );
        return collectionId - 1;
    }

    /**
     * @notice Buy a full collection from a seller
     * @param collectionId_ id of collection
     * @param of_ seller address
     */
    function BuyCollection(
        uint256 collectionId_,
        address of_
    ) public payable nonReentrant {
        NFTsCollection collection = NFTsCollection(
            payable(collections[collectionId_][of_])
        );

        _checkCollectionStatus(collectionId_, of_);

        uint256 requiredETH = collectionPrice[collectionId_];
        if (msg.value < requiredETH) {
            revert InsufficientETH(msg.value, requiredETH);
        }

        uint256 numberOfTokens = collection.balanceOf(of_);
        if (numberOfTokens == 0) {
            revert("Seller has no tokens");
        }

        uint256 marketplaceFee = (msg.value * SELL_FEE) / 1e18;
        uint256 sellerAmount = msg.value - marketplaceFee;

        collections[collectionId_][_msgSender()] = address(collection);
        delete collections[collectionId_][of_];
        ownerOfCollection[address(collection)] = _msgSender();

        (bool success, ) = payable(of_).call{value: sellerAmount}("");
        require(success, "Seller payment failed");

        collection.transferOwnershipFromFactory(_msgSender());
    }

    /**
     * @notice Update collection price and sale status
     * @param collectionId_ id of collection
     * @param newPrice_ new price in ETH
     * @param status_ sale status (true/false)
     */
    function UpdateCollectionStatus(
        uint256 collectionId_,
        uint256 newPrice_,
        bool status_
    ) external {
        _validateCollectionOwner(collectionId_);
        isForSale[collectionId_] = status_;
        uint256 _oldPrice = collectionPrice[collectionId_];
        collectionPrice[collectionId_] = newPrice_;

        emit CollectionPriceUpdated(collectionId_, _oldPrice, newPrice_);
        emit CollectionSaleStatusUpdated(collectionId_, _msgSender(), status_);
    }

    /**
     * @notice Withdraw collected fees
     */
    function withdrawFees() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }

    // -----------------------------------------------------------------------
    // Internal / Private Functions
    // -----------------------------------------------------------------------

    /**
     * @notice Check if collection is for sale
     * @param collectionId_ id of collection
     * @param of_ owner address
     */
    function _checkCollectionStatus(
        uint256 collectionId_,
        address of_
    ) internal view {
        if (!isForSale[collectionId_]) {
            revert CollectionIsNotForSale(
                collectionId_,
                collections[collectionId_][of_]
            );
        }
    }

    /**
     * @notice Validate that msg.sender owns the collection
     * @param collectionId_ id of collection
     */
    function _validateCollectionOwner(uint256 collectionId_) internal view {
        address _collection = collections[collectionId_][_msgSender()];
        if (_msgSender() != ownerOfCollection[_collection]) {
            revert UnauthorizedCollectionOwner(
                _msgSender(),
                ownerOfCollection[_collection]
            );
        }
    }

    // -----------------------------------------------------------------------
    // Fallbacks
    // -----------------------------------------------------------------------

    /** Accept plain ETH */
    receive() external payable {}

    /** Reject invalid function calls */
    fallback() external payable {
        revert("Invalid function call");
    }
}
