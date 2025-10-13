import React, { useEffect, useState } from "react";
import CollectionCard from "../CollectionCard";
import useReadSingleCollection from "../../blockchain-interaction/hooks/nft/read/useReadSingleCollection";
import useReadAllCollections from "../../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import useCollectionStore from "../../blockchain-interaction/stores/useCollectionStore.store";
import useReadFactoryInstanceStore from "../../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";

const TopCollections = () => {
  useReadAllCollections();
  useReadFactoryContract();

  const [collectionsData, setCollectionsData] = useState([
    { collectioId: "", collection: "", accountAddress: "" },
  ]);
  const { collections } = useCollectionStore();
  const { getNFTCollectionInstance, signer } = useReadSingleCollection();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  useEffect(() => {
    const loadCollections = async () => {
      const data = await Promise.all(
        collections.map(
          async ({ collectionAddress, accountAddress, image }) => {
            const instance = await getNFTCollectionInstance(collectionAddress);
            console.log("instance in top collection ", instance);
            const id = await factoryReadInstance.collectionAddressToId(
              collectionAddress
            );

            return {
              collectionId: id,
              collection: instance,
              accountAddress,
              image,
            };
          }
        )
      );

      setCollectionsData(data);
    };

    if (collections.length > 0) {
      loadCollections();
    }
  }, [collections]);

  return (
    <div className="collections-section px-10 bg-primary-black border-q min-h-[60vh] flex flex-col">
      <h1 className="text-white text-3xl font-unbounded font-semibold mb-6">
        <span className="text-action-btn-green">TOP</span> COLLECTIONS
      </h1>

      {collectionsData.length > 0 && collections.length > 0 ? (
        <>
          <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          </table>

          {collectionsData.map(
            ({ index, collectionId, collection, accountAddress, image }) => (
              <CollectionCard
                key={index}
                collectionId={collectionId}
                collection={collection}
                accountAddress={accountAddress}
                image={image}
              />
            )
          )}

          <div className="w-full flex justify-center py-5">
            <button className="bg-action-btn-green py-2 px-10 rounded-full cursor-pointer font-unbounded">
              VIEW ALL
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>
          <h2 className="text-gray-300 text-xl font-unbounded mb-2">
            No Collections Yet
          </h2>
          <p className="text-gray-500 max-w-md">
            There are currently no NFT collections available. Once collections
            are deployed, they will appear here automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default TopCollections;
