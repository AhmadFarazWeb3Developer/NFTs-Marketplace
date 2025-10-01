import React, { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatEther } from "ethers";
import useReadFactoryInstanceStore from "../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";
import useExploreCollection from "../blockchain-interaction/hooks/collection/read/useExploreCollection";

const CollectionCard = ({ collectionId, collection, accountAddress }) => {
  const navigateTo = useNavigate();

  useReadFactoryContract();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  const [collectionDetails, setCollectionDetails] = useState({
    symbol: "",
    avgPrice: "",
    items: "",
    owners: "",
    remaing: "",
    forSale: "",
  });

  const calculateAvgPrice = async () => {
    let totalPrice = 0n;
    const supply = await collection.tokenId();
    for (let tokenId = 0n; tokenId < supply; tokenId++) {
      const price = await collection.tokenPrice(tokenId);
      totalPrice += price;
    }

    if (supply === 0n) return "0";

    const avgPrice = totalPrice / supply;
    return formatEther(avgPrice);
  };

  useEffect(() => {
    const fetchCollectionsDetails = async () => {
      const symbol = await collection.symbol();
      const avgPrice = await calculateAvgPrice();
      const totalItems = await collection.tokenId();
      const remaining = await collection.balanceOf(accountAddress);

      const owners = totalItems - remaining;

      const forSale = await factoryReadInstance.isForSale(collectionId);

      setCollectionDetails({
        symbol,
        avgPrice,
        items: totalItems.toString(),
        owners: owners.toString(),
        remaining: remaining.toString(),
        forSale: forSale.toString(),
      });
    };

    fetchCollectionsDetails();
  }, [collection, factoryReadInstance]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs uppercase dark:text-gray-500 font-unbounded font-light">
          <tr>
            <th scope="col" className="px-2 py-3 w-[120px]">
              COLLECTION
            </th>
            <th scope="col" className="px-2 py-3 w-[150px]">
              Symbol
            </th>

            <th scope="col" className="px-2 py-3">
              AVG PRICE
            </th>
            <th scope="col" className="px-2 py-3">
              ITEMS
            </th>
            <th scope="col" className="px-2 py-3">
              OWNERS
            </th>
            <th scope="col" className="px-2 py-3">
              REMAINING
            </th>
            <th scope="col" className="px-2 py-3">
              FOR SALE
            </th>
          </tr>
        </thead>
        <tbody className="font-unbounded font-light">
          <tr
            className="collection-card border-b border-gray-700 text-white hover:border-none"
            onClick={() => {
              navigateTo(`/explore/collection/${collection.target}`);
            }}
          >
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="richLizard.jpeg"
                  alt="Rich Lizard"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              {collectionDetails.symbol}
            </td>
            <td className="px-2 py-4">{collectionDetails.avgPrice}</td>
            <td className="px-2 py-4">{collectionDetails.items}</td>
            <td className="px-2 py-4">{collectionDetails.owners}</td>
            <td className="px-2 py-4">{collectionDetails.remaining}</td>
            <td className="px-2 py-4">{collectionDetails.forSale}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CollectionCard;
