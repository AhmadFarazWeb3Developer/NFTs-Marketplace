import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2 } from "lucide-react";
import { SiEthereum } from "react-icons/si";
import { FiCopy, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useReadFactoryInstanceStore from "../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
import useWriteFactoryContract from "../blockchain-interaction/hooks/factory/useWriteFactoryContract";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";
const AddressHoverCard = ({ label, address }) => {
  useReadAllCollections();

  const [copied, setCopied] = useState(false);
  const [hover, setHover] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const truncateAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div
      className="relative flex flex-col items-start"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="text-paragraph/60 text-xs mb-1">{label}</p>

      <div
        className="flex items-center gap-2 text-white font-mono truncate cursor-pointer"
        onClick={handleCopy}
      >
        {truncateAddress(address)}
        {copied ? (
          <FiCheck size={14} className="text-action-btn-green" />
        ) : (
          <FiCopy size={14} className="opacity-80 hover:opacity-100" />
        )}
      </div>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                       bg-black/80 border border-action-btn-green/30 
                       rounded-xl p-2 text-xs text-white shadow-lg 
                       backdrop-blur-md w-max max-w-xs break-all z-50"
          >
            {address}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuyCollection = () => {
  useReadAllCollections();

  const { factoryReadInstance } = useReadFactoryInstanceStore();
  const { factoryWriteInstance } = useWriteFactoryContract();

  const location = useLocation();
  const navigate = useNavigate();

  const { collectionId, collectionName, collectionAddress, image } =
    location.state || {};

  const [ownerAddress, setOwnerAddress] = useState("");
  const [collectionPrice, setCollectionPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    const init = async () => {
      if (
        !factoryReadInstance ||
        collectionId === undefined ||
        collectionId === null
      ) {
        console.log("Factory or ID not ready yet...");
        return;
      }

      try {
        const owner = await factoryReadInstance.ownerOfCollection(
          collectionAddress
        );

        const price = await factoryReadInstance.collectionPrice(collectionId);
        setOwnerAddress(owner);
        setCollectionPrice(price);
      } catch (err) {
        console.error("Error fetching collection details:", err);
      }
    };
    init();
  }, [collectionId, collectionAddress, factoryReadInstance]);

  const handleBuyCollection = async () => {
    try {
      if (!factoryReadInstance || !factoryWriteInstance) {
        setTxStatus("Factory instance not found.");
        return;
      }

      setLoading(true);
      setTxStatus("Processing transaction...");

      const tx = await factoryWriteInstance.BuyCollection(
        collectionId,
        ownerAddress,
        { value: collectionPrice }
      );
      const receipt = await tx.wait();

      const newOwner = await factoryReadInstance.ownerOfCollection(
        collectionAddress
      );

      console.log("new Owner : ", newOwner);

      if (receipt && newOwner) {
        const response = await fetch(
          "http://localhost:3000/api/v1/update-owner",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              collectionAddress,
              newOwner,
            }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setTxStatus("Successfully purchased the collection!");
        } else {
          console.warn("Backend update failed:", data);
          setTxStatus("Purchase completed, but backend sync failed.");
        }

        setLoading(false);

        setTimeout(() => navigate("/"), 2500);
      }
    } catch (error) {
      console.error("BuyCollection error:", error);
      setTxStatus("Transaction failed. Check console for details.");
      setLoading(false);
    }
  };

  const formatPrice = (weiValue) => {
    if (!weiValue) return "0";
    try {
      return parseFloat((Number(weiValue) / 1e18).toFixed(4));
    } catch {
      return "0";
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-primary-black text-white min-h-screen px-6 md:px-20 py-10 font-unbounded flex justify-center items-center">
        <div className="w-full max-w-4xl bg-black/40 border border-paragraph/30 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 space-y-8 transition-all">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={image}
              alt={collectionName}
              className="w-48 h-48 rounded-2xl object-cover border border-action-btn-green/40 shadow-lg"
            />

            <div className="flex flex-col gap-3 flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-action-btn-green">
                {collectionName}
              </h1>
              <p className="text-paragraph/70 text-sm">
                Collection #{collectionId}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                <div className="bg-paragraph/10 p-3 rounded-xl border border-paragraph/20">
                  <AddressHoverCard
                    label="Collection Address"
                    address={collectionAddress}
                  />
                </div>

                <div className="bg-paragraph/10 p-3 rounded-xl border border-paragraph/20">
                  <AddressHoverCard label="Owner" address={ownerAddress} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-6 border-t border-paragraph/20 pt-6">
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <SiEthereum className="text-action-btn-green" size={22} />
              {formatPrice(collectionPrice)}{" "}
              <span className="text-paragraph/70 text-base">ETH</span>
            </div>

            <button
              onClick={handleBuyCollection}
              disabled={loading}
              className="bg-action-btn-green text-black px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Processing..." : "Buy Entire Collection"}
            </button>
          </div>

          {/* Status */}
          {txStatus && (
            <div className="text-center text-sm text-paragraph/70 mt-4 italic">
              {txStatus}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyCollection;
