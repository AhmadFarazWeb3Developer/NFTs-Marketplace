import React from "react";

const CollectionStatistics = () => {
  return (
    <>
      <div className="bg-primary-black">
        <h1>COLLECTION STATISTICS</h1>

        <div className="cards flex flex-row">
          <div className="flex flex-col p-10 border-1 rounded-sm justify-center items-center">
            <h6>TOTAL</h6>
            <h2>334</h2>
          </div>
          <div className="flex flex-col p-10 border-1 rounded-sm justify-center items-center">
            <h6>ACTIVA</h6>
            <h2>201</h2>
          </div>
          <div className="flex flex-col p-10 border-1 rounded-sm justify-center items-center">
            <h6>NFTS</h6>
            <h2>2456</h2>
          </div>
          <div className="flex flex-col p-10 border-1 rounded-sm justify-center items-center">
            <h6>WORTH</h6>
            <h2>
              30K
              <span>ETH</span>
            </h2>
          </div>
        </div>

        <h1>MARKETPLACE EARNING</h1>
        <h1>1024.25 ETH</h1>
        <h1>$ 5.4 M</h1>
      </div>
    </>
  );
};

export default CollectionStatistics;
