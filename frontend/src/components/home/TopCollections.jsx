import React, { useEffect, useState } from "react";
import CollectionCard from "../CollectionCard";
import useReadSingleCollection from "../../blockchain-interaction/hooks/nft/read/useReadSingleCollection";
import useReadAllCollections from "../../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";

const TopCollections = () => {
  const [collectionsData, setCollectionsData] = useState([
    { collectioId: "", collection: "", accountAddress: "" },
  ]);
  const { collections, accountAddresses } = useReadAllCollections();
  const { getNFTCollectionInstance } = useReadSingleCollection();
  const { factoryReadInstance } = useReadFactoryContract();

  useEffect(() => {
    const loadCollections = async () => {
      const data = await Promise.all(
        collections.map(async (collectionAddr, index) => {
          const instance = await getNFTCollectionInstance(collectionAddr);
          const id = await factoryReadInstance.collectionAddressToId(
            collectionAddr
          );
          const accountAddress = accountAddresses[index];

          return { collectionId: id, collection: instance, accountAddress };
        })
      );

      setCollectionsData(data);
    };

    if (collections.length > 0) {
      loadCollections();
    }
  }, [collections]);

  return (
    <div className="collections-section px-10 bg-primary-black">
      <h1 className="text-white text-3xl font-unbounded font-semibold">
        <span className="text-action-btn-green">TOP</span> COLLECTIONS
      </h1>

      {collectionsData.map(({ collectionId, collection, accountAddress }) => (
        <CollectionCard
          key={collectionId}
          collectionId={collectionId}
          collection={collection}
          accountAddress={accountAddress}
        />
      ))}

      <div className="w-full flex justify-center py-5">
        <button className="bg-action-btn-green py-2 px-10 rounded-full cursor-pointer">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default TopCollections;
