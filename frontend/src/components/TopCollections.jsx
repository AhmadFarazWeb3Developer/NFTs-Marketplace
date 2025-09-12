import React from "react";
import CollectionCard from "./CollectionCard";
const TopCollections = () => {
  return (
    <>
      <div className="collections-section px-10 bg-primary-black border-1">
        <h1>TOP COLLECTIONS</h1>
        <ul className="flex flex-row w-full justify-between">
          <li>COLLECTION</li>
          <li>NAME</li>
          <li>#ID</li>
          <li>AVG PRICE</li>
          <li>ITEMS</li>
          <li>OWNERS</li>
        </ul>

        <CollectionCard />
      </div>
    </>
  );
};

export default TopCollections;
