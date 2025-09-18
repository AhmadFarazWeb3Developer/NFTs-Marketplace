import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const MintNFT = () => {
  return (
    <div className="mint-nft rounded-md min-h-screen bg-primary-black text-white font-unbounded flex flex-col items-center px-6 py-8">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8">
        Mint <span className="text-action-btn-green">NFT</span>
      </h1>

      {/* Upload Box */}
      <label
        htmlFor="nft-upload"
        className="w-full max-w-md rounded-md border border-paragraph/50 p-8 flex flex-col items-center justify-center gap-3 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
      >
        <FaCloudUploadAlt className="text-action-btn-green text-5xl" />
        <p className="text-sm font-medium">Upload Your NFT Image</p>
        <p className="text-xs text-paragraph/70">PNG, JPG, GIF up to 10MB</p>
        <input id="nft-upload" type="file" className="hidden" />
      </label>

      {/* Price Input */}
      <div className="mt-8 w-full max-w-md">
        <label className="block text-sm mb-2">NFT Initial Price (ETH)</label>
        <input
          type="number"
          placeholder="e.g. 0.05"
          className="w-full px-4 py-2 rounded-md border border-paragraph/60 bg-black/30 text-white placeholder-gray-400 focus:border-action-btn-green focus:outline-none"
        />
      </div>

      {/* Mint Button */}
      <button className="mt-8 w-full max-w-md bg-action-btn-green text-black font-medium py-3 rounded-md hover:bg-[#aaff4d] transition-colors cursor-pointer">
        Mint NFT
      </button>
    </div>
  );
};

export default MintNFT;
