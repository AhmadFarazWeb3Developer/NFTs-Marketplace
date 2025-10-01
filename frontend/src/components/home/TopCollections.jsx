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
  const { getNFTCollectionInstance } = useReadSingleCollection();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  useEffect(() => {
    const loadCollections = async () => {
      const data = await Promise.all(
        collections.map(async ({ collectionAddress, accountAddress }) => {
          const instance = await getNFTCollectionInstance(collectionAddress);
          const id = await factoryReadInstance.collectionAddressToId(
            collectionAddress
          );

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

      {collectionsData.map(
        ({ index, collectionId, collection, accountAddress }) => (
          <CollectionCard
            key={index}
            collectionId={collectionId}
            collection={collection}
            accountAddress={accountAddress}
          />
        )
      )}

      <div className="w-full flex justify-center py-5">
        <button className="bg-action-btn-green py-2 px-10 rounded-full cursor-pointer">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default TopCollections;
