import React, { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

const MintNFT = () => {
  const [nftPrice, setNftPrice] = useState();
  const [nftImage, setNftImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const uploadNFT = () => {
    console.log("Price:", nftPrice);
    console.log("Image:", nftImage);
  };

  const uploadNftImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNftImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // generate preview
    }
  };

  return (
    <div className="mint-nft rounded-md bg-primary-black text-white font-unbounded flex flex-col items-center px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">
        Mint <span className="text-action-btn-green">NFT</span>
      </h1>

      {/* Upload Box */}
      <label
        htmlFor="nft-upload"
        className="w-full max-w-md rounded-md border border-paragraph/50 p-8 flex flex-col items-center justify-center gap-3 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
      >
        {nftImage ? (
          <FaCheckCircle className="text-green-400 text-5xl" />
        ) : (
          <FaCloudUploadAlt className="text-action-btn-green text-5xl" />
        )}

        <p className="text-sm font-medium">
          {nftImage ? "NFT Image Uploaded!" : "Upload Your NFT Image"}
        </p>
        {!nftImage && (
          <p className="text-xs text-paragraph/70">PNG, JPG, GIF up to 10MB</p>
        )}

        <input
          id="nft-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadNftImage}
        />
      </label>

      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-6 w-full max-w-md flex flex-col items-center  rounded-md border border-paragraph/50 py-3">
          <p className="text-sm text-paragraph/70 mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="NFT Preview"
            className="w-40 h-40 object-cover rounded-md border border-paragraph/50 shadow-md"
          />
        </div>
      )}

      {/* Price Input */}
      <div className="mt-8 w-full max-w-md">
        <label className="block text-sm mb-2">NFT Initial Price (ETH)</label>
        <input
          type="number"
          placeholder="e.g. 0.05"
          className="w-full px-4 py-2 rounded-md border border-paragraph/60 bg-black/30 text-white placeholder-gray-400 focus:border-action-btn-green focus:outline-none"
          onChange={(e) => setNftPrice(e.target.value)}
        />
      </div>

      {/* Mint Button */}
      <button
        className="mt-8 w-full max-w-md bg-action-btn-green text-black font-medium py-3 rounded-md hover:bg-[#aaff4d] transition-colors cursor-pointer"
        onClick={uploadNFT}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default MintNFT;
