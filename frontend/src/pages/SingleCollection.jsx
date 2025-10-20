import React, { cloneElement, useEffect, useRef, useState } from "react";
import SingleNFTCard from "../components/SingleNFTCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Copy } from "lucide-react";
import { SiEthereum } from "react-icons/si";
import { CiGrid41, CiSearch } from "react-icons/ci";
import { MdOutlineTableRows } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MintNFT from "./MintNFT";
import useCollectionNFTs from "../blockchain-interaction/hooks/collection/read/useCollectionNFTs";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import UpdateNFTSaleStatus from "./UpdateNFTSaleStatus";
import UpdateCollectionStatus from "../components/UpdateCollectionStatus";
import useReadFactoryInstanceStore from "../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
import { toast, ToastContainer } from "react-toastify";
import useWriteFactoryContract from "../blockchain-interaction/hooks/factory/useWriteFactoryContract";
import { useAppKitAccount } from "@reown/appkit/react";

const SingleCollection = () => {
  useReadFactoryContract();
  useReadAllCollections();
  const [refreshKey, setRefreshKey] = useState(0);
  const [layout, setLayout] = useState("grid");
  const location = useLocation();
  const navigate = useNavigate();

  const { factoryWriteInstance } = useWriteFactoryContract();
  const { address, isConnected } = useAppKitAccount();

  const { image } = location.state;

  const {
    collectionInstance,
    collection,
    collectionId,
    collectionName,
    collectionOwner,
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
  const collectionStatusSectionRef = useRef(null);

  const handleScrollToMintNFT = () => {
    mintNFTSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToUpdateStatus = () => {
    updateStatusSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToCollectionStatus = () => {
    collectionStatusSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBuyCollection = async () => {
    navigate("/buy-collection", {
      state: {
        collectionId,
        collectionName,
        collectionAddress: collection,
        image,
      },
    });
  };

  useEffect(() => {
    if (collectionName && !isLoading) {
      const splitedName = collectionName.split(" ");
      setSplitedCollectionName(splitedName);
    }
  }, [collectionName, isLoading]);

  const truncateAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 12) + "...." + address.slice(-12);
  };

  const copyToClipboard = async () => {
    if (collection) {
      try {
        await navigator.clipboard.writeText(collection);
        toast.success("Address copied to clipboard!", { autoClose: 1500 });
      } catch (err) {
        toast.error("Failed to copy address");
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="single-collection bg-primary-black text-white px-10 pt-4 font-unbounded">
        <div className="profile border-1 border-paragraph/40 rounded-sm flex w-full p-4 mb-4">
          <div className="left w-1/2 flex flex-row items-center  gap-4 ">
            <div className="w-24 h-24 rounded-full border border-paragraph/50 overflow-hidden flex items-center justify-center">
              <img
                src={image}
                alt="collection image"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col pl-2 gap-2 justify-center">
              <div className="flex flex-row gap-2 items-center">
                {splitedCollectionName.map((word, index) => (
                  <h3 className="font-medium uppercase" key={index}>
                    {index % 2 === 0 ? (
                      <span className="text-action-btn-green">{word} </span>
                    ) : (
                      <span className="text-white">{word} </span>
                    )}
                  </h3>
                ))}
                <span className="text-white/50 font">#{collectionId}</span>
              </div>

              <div className="flex flex-row font-extralight text-[11px] items-center">
                <div className="flex items-center gap-1 bg-paragraph/30 border border-paragraph/70 rounded-l-full  px-3 py-1 w-[95px] justify-center font-mono">
                  <p>Collection</p>
                </div>
                <div
                  className="group relative flex items-center gap-1 bg-paragraph/30 border border-paragraph/70 rounded-r-full px-3 py-1 cursor-pointer hover:bg-paragraph/40 transition-all min-w-[210px] justify-between"
                  onClick={() => copyToClipboard(collection)}
                >
                  <p className="text-white/80 font-mono">
                    {truncateAddress(collection)}
                  </p>
                  <Copy
                    size={13}
                    strokeWidth={1}
                    className="opacity-70 group-hover:opacity-100"
                  />

                  <div className="absolute left-1/2 -translate-x-1/2 top-8 hidden  group-hover:block bg-paragraph/90 text-white text-[10px] px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                    {collection}
                  </div>
                </div>
              </div>

              <div className="flex flex-row  font-extralight text-[11px] items-center">
                <div className="flex items-center gap-1 bg-paragraph/30 border border-paragraph/70 rounded-l-full px-3 py-1 w-[95px] justify-center font-mono">
                  <p className="text-[11px] font-extralight">Owner</p>
                </div>
                <div
                  className="group relative flex items-center gap-1 bg-paragraph/30 border border-paragraph/70 rounded-r-full px-3 py-1 cursor-pointer hover:bg-paragraph/40 transition-all min-w-[210px] justify-between"
                  onClick={() => copyToClipboard(collectionOwner)}
                >
                  <p className="text-white/80 font-mono">
                    {truncateAddress(collectionOwner)}
                  </p>
                  <Copy
                    size={13}
                    strokeWidth={1}
                    className="opacity-70 group-hover:opacity-100"
                  />

                  <div className="absolute left-1/2 -translate-x-1/2 top-8 hidden group-hover:block bg-paragraph/90 text-white text-[10px] px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                    {collectionOwner}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right w-1/2 flex justify-end items-center gap-10">
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph">ITEMS</p>
              <p>{totalItems}</p>
            </div>
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph">AVG PRICE</p>
              <p>{avgPrice}</p>
            </div>
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph">TOTAL WORTH</p>
              <p>{totalWorth}</p>
            </div>

            <button
              onClick={handleBuyCollection}
              className="bg-action-btn-green text-black text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Buy Entire Collection
            </button>
          </div>
        </div>

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
            <CiGrid41
              size={24}
              className={`cursor-pointer transition-colors ${
                layout === "grid"
                  ? "text-action-btn-green"
                  : "text-paragraph/70"
              }`}
              onClick={() => setLayout("grid")}
            />
            <MdOutlineTableRows
              size={24}
              className={`cursor-pointer transition-colors ${
                layout === "list"
                  ? "text-action-btn-green"
                  : "text-paragraph/70"
              }`}
              onClick={() => setLayout("list")}
            />
          </div>

          {collectionOwner === address && isConnected && (
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
              <button
                className="bg-paragraph/30 border border-paragraph/70 text-xs px-4 py-1 rounded-full text-white font-light cursor-pointer transition-all duration-200 hover:bg-paragraph/50 hover:scale-105 active:scale-95"
                onClick={handleScrollToCollectionStatus}
              >
                Update Collection Status
              </button>
            </div>
          )}
        </div>

        <div
          className={`py-4 gap-4 w-full border-1 ${
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "flex flex-col items-start"
          }`}
        >
          {NFTsPricesAndIds.map(({ tokenId, tokenPrice }, index) => (
            <SingleNFTCard
              key={tokenId}
              tokenId={tokenId}
              tokenPrice={tokenPrice}
              collectionInstance={collectionInstance}
              tokenURI={tokenURIs[index]}
              image={image}
              layout={layout}
            />
          ))}
        </div>

        {collectionOwner === address && isConnected && (
          <>
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
              className="border rounded-md border-paragraph/40 py-4 my-4"
            >
              <UpdateNFTSaleStatus collectionInstance={collectionInstance} />
            </div>

            <div
              ref={collectionStatusSectionRef}
              className="border rounded-md border-paragraph/40 py-4"
            >
              {factoryWriteInstance && (
                <UpdateCollectionStatus
                  factoryWriteInstance={factoryWriteInstance}
                  collectionId={collectionId}
                />
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SingleCollection;
