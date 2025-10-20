import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import useReadSingleCollection from "../../blockchain-interaction/hooks/nft/read/useReadSingleCollection";
import fetchEthUsd from "../../blockchain-interaction/hooks/nft/read/fetchEthUSD";
import useBuyNFT from "../../blockchain-interaction/hooks/nft/write/useBuyNFT";
import { ToastContainer, toast } from "react-toastify";

const BuyNft = () => {
  const [activeTab, setActiveTab] = useState("");
  const [instance, setInstance] = useState(null);
  const [tokenOwer, setTokenOwner] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const [EthUSD, setEthUSD] = useState(null);

  const { tokenId } = useParams();
  const { state } = useLocation();

  const { tokenPrice, collectionAddress, NFTImage, collectionImage } = state;

  const { getNFTCollectionInstance, signer } = useReadSingleCollection();

  const { buyNFT, error } = useBuyNFT();

  useEffect(() => {
    const init = async () => {
      if (!collectionAddress || !signer) {
        console.log("Waiting for signer or collectionAddress...");
        return;
      }

      try {
        const localInstance = await getNFTCollectionInstance(collectionAddress);
        const name = await localInstance.name();
        const owner = await localInstance.ownerOf(tokenId);
        const usd = await fetchEthUsd();

        setInstance(localInstance);
        setCollectionName(name);
        setTokenOwner(owner);
        setEthUSD(usd * tokenPrice);
        if (error) toast.error(error);
      } catch (err) {
        console.error("Error initializing BuyNft:", err);
      }
    };

    init();
  }, [
    signer,
    collectionAddress,
    tokenId,
    tokenPrice,
    getNFTCollectionInstance,
    error,
  ]);

  function formatToK(num) {
    if (num === null || num === undefined) return "";
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
    return num.toFixed(2);
  }

  const BuyingNFT = async () => {
    await buyNFT(instance, tokenId, tokenPrice);
  };

  return (
    <div className="buyNft-section border bg-primary-black">
      <div className="my-5 flex flex-row px-10 bg-primary-black font-unbounded text-white/90">
        <div className="left flex items-start">
          <div className="box w-fit rounded-sm p-4 flex justify-center items-center bg-paragraph/10">
            <img
              src={NFTImage}
              alt="NFT Image"
              className="max-h-96 object-contain rounded-sm"
            />
          </div>
        </div>

        <div className="right flex-1 px-6">
          <div>
            <h1 className="p-0 leading-none text-action-btn-green font-unbounded font-semibold text-lg">
              # {tokenId}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm font-light mt-4">
            <div className="flex items-center gap-2">
              <img
                src={collectionImage}
                alt="collection Image"
                className="w-6 h-6 rounded-full bg-gray-700 object-cover border border-gray-600/10"
              />
              <h2>{collectionName}</h2>
            </div>
            <div className="text-paragraph/50">|</div>
            <div className="flex gap-2">
              <p className="text-paragraph">Owned by</p>
              <h2>{tokenOwer}</h2>
            </div>
          </div>

          <div className="border border-gray-700 rounded-md p-4 my-4 bg-black/20">
            <p className="font-light text-paragraph text-xs">BUY FOR</p>
            <h2 className="text-lg my-4 font-medium">
              {tokenPrice} ETH
              <span className="text-xs text-paragraph">
                ({formatToK(EthUSD)})
              </span>
            </h2>
            <button
              onClick={BuyingNFT}
              className="mt-3 w-full bg-action-btn-green text-black py-2 rounded-md font-normal cursor-pointer hover:bg-action-btn-green/80"
            >
              Buy now
            </button>
          </div>

          <div>
            <div className="flex gap-6 border-b border-gray-700 pb-1 text-xs ">
              <button
                onClick={() => setActiveTab("traits")}
                className={`cursor-pointer font-light ${
                  activeTab === "traits"
                    ? "text-action-btn-green font-medium"
                    : "text-paragraph hover:text-action-btn-green"
                }`}
              >
                Traits
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`cursor-pointer font-light ${
                  activeTab === "activity"
                    ? "text-action-btn-green font-medium "
                    : "text-paragraph hover:text-action-btn-green "
                }`}
              >
                Activity
              </button>
              <ToastContainer />
            </div>

            <div className="mt-4 border border-gray-700 rounded-sm p-4 font-light text-xs bg-black/20">
              {activeTab === "traits" && (
                <div>
                  <p className="small-paragraph ">Power: Legendary</p>
                  <p className=" small-paragraph"> Weapon: Dual Sabers</p>
                  <p className="small-paragraph"> Rarity: Ultra Rare</p>
                </div>
              )}
              {activeTab === "activity" && (
                <div>
                  <p className="small-paragraph ">
                    Sold for 40 ETH · 2 days ago
                  </p>
                  <p className="small-paragraph">
                    Listed for 50 ETH · 1 hour ago
                  </p>
                </div>
              )}
              {activeTab === "" && (
                <p className="small-paragraph text-paragraph/50 text-center ">
                  Click Traits or Activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNft;
