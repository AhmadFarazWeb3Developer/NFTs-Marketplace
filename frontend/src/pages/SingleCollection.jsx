import React, { useEffect, useRef } from "react";
import SingleCollectionsCard from "../components/single-collections-card/SingleCollectionsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Copy, Toilet } from "lucide-react";
import { SiEthereum } from "react-icons/si";
import { CiGrid41, CiSearch } from "react-icons/ci";
import { MdOutlineTableRows } from "react-icons/md";
import MintNFT from "./MintNFT";
import useCollectionNFTs from "../blockchain-interaction/hooks/collection/read/useCollectionNFTs";
import { useState } from "react";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";

import UpdateNFTSaleStatus from "./UpdateNFTSaleStatus";
import { useLocation } from "react-router-dom";

const SingleCollection = () => {
  useReadFactoryContract();
  useReadAllCollections();
  const [refreshKey, setRefreshKey] = useState(0);

  const location = useLocation();
  const { image } = location.state;

  const {
    collectionInstance,
    collection,
    collectionId,
    collectionName,
    totalItems,
    avgPrice,
    totalWorth,
    NFTsPricesAndIds,
    isLoading,
    tokenURIs,
  } = useCollectionNFTs(refreshKey);

  const handleMintSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const [splitedCollectionName, setSplitedCollectionName] = useState([]);
  const mintNFTSectionRef = useRef(null);

  const handleScrollToMintNFT = () => {
    mintNFTSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (collectionName && !isLoading) {
      const splitedName = collectionName.split(" ");
      setSplitedCollectionName(splitedName);
    }
  }, [collectionName, isLoading]);

  return (
    <>
      <Navbar />

      <div className="single-collection bg-primary-black text-white px-10 pt-4 font-unbounded">
        <div className="profile border-1 border-paragraph/40 rounded-sm flex w-full p-4">
          <div className="left w-1/2 flex flex-row ">
            <div className="w-16 h-16 rounded-full border-1 border-paragraph/50">
              <img
                src={image}
                alt="collection image"
                className="object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col pl-2 gap-1 justify-center ">
              <div className="flex flex-row gap-2">
                {splitedCollectionName.map((word, index) => (
                  <h3 className="font-medium uppercase">
                    {index % 2 === 0 ? (
                      <span className="text-action-btn-green">{word} </span>
                    ) : (
                      <span className="text-white">{word} </span>
                    )}
                  </h3>
                ))}
                <span className="text-white/50 font">#{collectionId}</span>
              </div>
              <div className=" flex flex-row gap-2  font-extralight text-xs">
                <div className="py-1 px-2 flex items-center border-1 border-paragraph/70 rounded-sm bg-paragraph/30 gap-1">
                  <SiEthereum />
                  <p>ETHEREUM</p>
                </div>
                <div className="py-1 px-2 border rounded-sm border-paragraph/70 bg-paragraph/30 gap-2 flex cursor-pointer">
                  <p>{collection}</p>
                  <Copy strokeWidth={0.7} size={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="right w-1/2 flex justify-end gap-10">
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph ">ITEMS</p>
              <p>{totalItems}</p>
            </div>

            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph">AVG PRICE</p>
              <p>{avgPrice}</p>
            </div>

            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph"> TOTAL WORTH</p>
              <p>{totalWorth}</p>
            </div>
          </div>
        </div>

        <div className="search-layout border-b-1 border-paragraph/50 flex gap-4 items-center w-full  py-4 ">
          <div className="search border-1  border-paragraph/50 w-1/3 flex items-center justify-between px-2  rounded-sm">
            <input
              type="search"
              placeholder="Search NFT by name or Id"
              className="placeholder:text-xs placeholder:font-extralight placeholder:text-paragraph/70  "
            />
            <CiSearch className="text-paragraph/70" />
          </div>
          <div className="flex gap-2">
            <CiGrid41 size={24} className="text-paragraph/70" />
            <MdOutlineTableRows size={24} className="text-paragraph/70" />
          </div>

          <div className="w-full  flex items-center justify-end">
            <button
              ref={mintNFTSectionRef}
              className="bg-action-btn-green text-xs px-4 py-1 rounded-full text-black font-light cursor-pointer"
              onClick={handleScrollToMintNFT}
            >
              Mint NFT
            </button>
          </div>
        </div>
        <div className="nft-cards py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  justify-start border-1">
          {NFTsPricesAndIds.map(({ tokenId, tokenPrice }, index) => (
            <SingleCollectionsCard
              key={tokenId}
              tokenId={tokenId}
              tokenPrice={tokenPrice}
              collectionInstance={collectionInstance}
              tokenURI={tokenURIs[index]}
            />
          ))}
        </div>

        <div
          ref={mintNFTSectionRef}
          className=" border rounded-md border-paragraph/40 "
        >
          <MintNFT
            collectionInstance={collectionInstance}
            onMintSuccess={handleMintSuccess}
          />
        </div>

        <div>
          <UpdateNFTSaleStatus collectionInstance={collectionInstance} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleCollection;
