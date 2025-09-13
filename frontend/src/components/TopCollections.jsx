import React from "react";
import CollectionCard from "./CollectionCard";
const TopCollections = () => {
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
