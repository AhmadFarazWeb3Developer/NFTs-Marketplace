import React, { useEffect, useRef, useState } from "react";
import SingleCollectionsCard from "../components/single-collections-card/SingleCollectionsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Copy } from "lucide-react";
import { SiEthereum } from "react-icons/si";
import { CiGrid41, CiSearch } from "react-icons/ci";
import { MdOutlineTableRows } from "react-icons/md";
import MintNFT from "./MintNFT";
import useCollectionNFTs from "../blockchain-interaction/hooks/collection/read/useCollectionNFTs";
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
  const updateStatusSectionRef = useRef(null);

  const handleScrollToMintNFT = () => {
    mintNFTSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToUpdateStatus = () => {
    updateStatusSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="search-layout border-b-1 border-paragraph/50 flex gap-4 items-center w-full py-4">
          <div className="search border-1 border-paragraph/50 w-1/3 flex items-center justify-between px-2 rounded-sm">
            <input
              type="search"
              placeholder="Search NFT by name or Id"
              className="placeholder:text-xs placeholder:font-extralight placeholder:text-paragraph/70"
            />
            <CiSearch className="text-paragraph/70" />
          </div>

          <div className="flex gap-2">
            <CiGrid41 size={24} className="text-paragraph/70" />
            <MdOutlineTableRows size={24} className="text-paragraph/70" />
          </div>

          <div className="w-full flex items-center justify-end gap-3">
            <button
              className="bg-action-btn-green text-xs px-4 py-1 rounded-full text-black font-light cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95"
              onClick={handleScrollToMintNFT}
            >
              Mint NFT
            </button>

            <button
              className="bg-paragraph/30 border border-paragraph/70 text-xs px-4 py-1 rounded-full text-white font-light cursor-pointer transition-all duration-200 hover:bg-paragraph/50 hover:scale-105 active:scale-95"
              onClick={handleScrollToUpdateStatus}
            >
              Update Status
            </button>
          </div>
        </div>

        {/* --- NFT Cards --- */}
        <div className="nft-cards py-4 flex flex-wrap gap-5 justify-start">
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
          className="border rounded-md border-paragraph/40"
        >
          <MintNFT
            collectionInstance={collectionInstance}
            onMintSuccess={handleMintSuccess}
          />
        </div>

        <div
          ref={updateStatusSectionRef}
          className="border rounded-md border-paragraph/40 mt-4"
        >
          <UpdateNFTSaleStatus collectionInstance={collectionInstance} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleCollection;
