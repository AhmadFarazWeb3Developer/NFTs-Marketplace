import React, { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatEther } from "ethers";
import useReadFactoryInstanceStore from "../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import { HiOutlineCollection } from "react-icons/hi";
import { BsCircleFill } from "react-icons/bs";

const CollectionCard = ({
  collectionId,
  collection,
  accountAddress,
  image,
}) => {
  useReadFactoryContract();
  useReadAllCollections();

  const { factoryReadInstance } = useReadFactoryInstanceStore();
  const navigateTo = useNavigate();

  const [collectionDetails, setCollectionDetails] = useState({
    name: "",
    symbol: "",
    avgPrice: "",
    items: "",
    owners: "",
    remaining: "",
    forSale: "",
  });

  const calculateAvgPrice = async () => {
    let totalPrice = 0n;
    const supply = await collection.tokenId();

    if (supply === 0n) return "0.00";

    for (let tokenId = 0n; tokenId < supply; tokenId++) {
      const price = await collection.tokenPrice(tokenId);
      totalPrice += price;
    }

    const avgPrice = totalPrice / supply;

    const avgPriceInEth = parseFloat(formatEther(avgPrice)).toFixed(2);

    return avgPriceInEth;
  };

  useEffect(() => {
    const fetchCollectionsDetails = async () => {
      const name = await collection.name();
      const symbol = await collection.symbol();
      const avgPrice = await calculateAvgPrice();
      const totalItems = await collection.tokenId();
      const remaining = await collection.balanceOf(accountAddress);

      const owners = totalItems - remaining;

      const forSale = await factoryReadInstance.isForSale(collectionId);

      setCollectionDetails({
        name,
        symbol,
        avgPrice,
        items: totalItems.toString(),
        owners: owners.toString(),
        remaining: remaining.toString(),
        forSale: forSale.toString(),
      });
    };

    fetchCollectionsDetails();
  }, [collection, collectionId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg   ">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <tbody className="font-unbounded font-light">
          <tr
            className="collection-card border-b border-gray-700 text-white hover:border-none"
            onClick={() => {
              navigateTo(`/explore/collection/${collection.target}`, {
                state: { image },
              });
            }}
          >
            <td className="px-6 py-4 ">
              <div className="w-16 h-16 border-1 rounded-md border-paragraph/50">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>

            <td className="px-2 py-3">{collectionDetails.name}</td>
            <td className="px-2 py-3">{collectionDetails.symbol}</td>

            <td className="px-2 py-3">
              {collectionDetails.avgPrice}{" "}
              <span className="text-paragraph/50">ETH</span>{" "}
            </td>
            <td className="px-2 py-3">{collectionDetails.items}</td>
            <td className="px-2 py-3">{collectionDetails.owners}</td>
            <td className="px-2 py-3">{collectionDetails.remaining}</td>
            <td className="px-2 py-3 ">
              <div className="flex items-center gap-2">
                <BsCircleFill
                  size={6}
                  className={`text-xs ${
                    collectionDetails.forSale === "true"
                      ? "text-green-500"
                      : "text-red-400"
                  }`}
                />
                <span className="text-paragraph/70 font-light">
                  {collectionDetails.forSale === "true"
                    ? "Active"
                    : "Not Active"}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CollectionCard;
