import React, { useEffect } from "react";
import CollectionCard from "../CollectionCard";
import useReadSingleCollection from "../../blockchain-interaction/hooks/nft/read/useReadSingleCollection";
import useReadAllCollections from "../../blockchain-interaction/hooks/collection/read/useReadAllCollections";

const TopCollections = () => {
  const { collections } = useReadAllCollections();

  const { getNFTCollectionInstance } = useReadSingleCollection();

  useEffect(() => {
    // console.log(collections);
    const init = async () => {
      for (let i = 0; i < collections.length; i++) {
        const collection = getNFTCollectionInstance(collections[i]);
        // console.log("NFTCollection : ", await collection);
      }
    };

    init();
  }, [collections]);

  return (
    <>
      <div className="collections-section px-10 bg-primary-black">
        <h1 className="text-white text-3xl font-unbounded font-semibold">
          <span className="text-action-btn-green">TOP</span> COLLECTIONS
        </h1>

        <CollectionCard />

        <div className="w-full flex justify-center py-5">
          <button className="bg-action-btn-green py-2 px-10 rounded-full cursor-pointer">
            VIEW ALL
          </button>
        </div>
      </div>
    </>
  );
};

export default TopCollections;
