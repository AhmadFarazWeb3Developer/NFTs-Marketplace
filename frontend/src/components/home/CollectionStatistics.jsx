import React, { useEffect, useState } from "react";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";
import fetchEthUsd from "../../blockchain-interaction/hooks/nft/read/fetchEthUSD";

const CollectionStatistics = () => {
  const { factoryBalance } = useReadFactoryContract();
  const [usdBalance, setUsdBalance] = useState(null);

  useEffect(() => {
    const getUsdBalance = async () => {
      const rate = await fetchEthUsd();
      if (rate && factoryBalance) {
        setUsdBalance((factoryBalance * rate).toLocaleString());
      }
    };
    getUsdBalance();
  }, [factoryBalance]);

  return (
    <>
      <div className="relative w-full bg-primary-black font-unbounded text-white py-10  px-10">
        <h1 className="text-action-btn-green text-3xl  font-semibold">
          COLLECTION <span className="text-white"> STATISTICS</span>
        </h1>

        <div className="cards flex flex-row gap-12 py-8 ">
          <div className="flex flex-col px-12 py-6  bg-card-gray rounded-sm justify-center items-center">
            <h6 className="font-light text-base">TOTAL</h6>
            <h2 className="font-medium text-2xl text-action-btn-green">334</h2>
          </div>
          <div className="flex flex-col px-12 py-6 bg-card-gray  rounded-sm justify-center items-center">
            <h6 className="font-light text-base">ACTIVE</h6>
            <h2 className="font-medium text-2xl text-action-btn-green">201</h2>
          </div>
          <div className="flex flex-col px-12 py-6 bg-card-gray  rounded-sm justify-center items-center">
            <h6 className="font-light text-base">NFTS</h6>
            <h2 className="font-medium text-2xl text-action-btn-green">2456</h2>
          </div>
          <div className="flex flex-col  px-12 py-6 bg-card-gray  rounded-sm justify-center items-center">
            <h6 className="font-light text-base">WORTH</h6>
            <h2 className="font-medium text-2xl text-action-btn-green">
              30K
              <br />
              ETH
            </h2>
          </div>
        </div>

        <h1 className="text-action-btn-green font-semibold text-3xl mt-10">
          MARKETPLACE EARNING
        </h1>
        <h1 className="font-semibold text-8xl my-4">{factoryBalance} ETH</h1>
        <h1 className="font-light text-paragraph text-8xl">
          {usdBalance ? `$ ${usdBalance}` : "$ --"}
        </h1>
        <div className="circle rounded-full bg-action-btn-green absolute right-0 top-0 overflow-hidden"></div>
      </div>
    </>
  );
};

export default CollectionStatistics;
