import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import useMintNFT from "../blockchain-interaction/hooks/nft/write/useMintNFT";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";
import { ToastContainer, toast } from "react-toastify";

const MintNFT = ({ collectionInstance }) => {
  useReadFactoryContract();

  const { mintNFTOnChain, IsError, IsSuccess } = useMintNFT();

  const [formData, setFormData] = useState({
    nftPrice: "",
    nftImage: null,
    previewUrl: null,
  });

  const mintNFT = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("nftPrice", formData.nftPrice);
    if (formData.nftImage) {
      form.append("nftImage", formData.nftImage);
    }

    try {
      if (!collectionInstance) {
        console.log("Collection instace does not exists");
      }

      await mintNFTOnChain(collectionInstance, formData.nftPrice);

      const response = await fetch(
        "http://localhost:3000/api/v1/add-mint-nft",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const uploadNftImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        nftImage: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  useEffect(() => {
    if (IsError) {
      toast.error(Error);
    }
    if (IsSuccess) {
      toast.success("NFT Minted!");
    }
  }, [Error]);

  return (
    <form
      onSubmit={mintNFT}
      className="mint-nft rounded-md bg-primary-black text-white font-unbounded flex flex-col items-center px-6 py-8"
    >
      <h1 className="text-2xl font-semibold mb-8">
        Mint <span className="text-action-btn-green">NFT</span>
      </h1>

      <label
        htmlFor="nft-upload"
        className="w-full max-w-md rounded-md border border-paragraph/50 p-8 flex flex-col items-center justify-center gap-3 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
      >
        {formData.nftImage ? (
          <FaCheckCircle className="text-green-400 text-5xl" />
        ) : (
          <FaCloudUploadAlt className="text-action-btn-green text-5xl" />
        )}
        <p className="text-sm font-medium">
          {formData.nftImage ? "NFT Image Uploaded!" : "Upload Your NFT Image"}
        </p>
        {!formData.nftImage && (
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

      {formData.previewUrl && (
        <div className="mt-6 w-full max-w-md flex flex-col items-center rounded-md border border-paragraph/50 py-3">
          <p className="text-sm text-paragraph/70 mb-2">Preview:</p>
          <img
            src={formData.previewUrl}
            alt="NFT Preview"
            className="w-40 h-40 object-cover rounded-md border border-paragraph/50 shadow-md"
          />
        </div>
      )}

      <div className="mt-8 w-full max-w-md">
        <label className="block text-sm mb-2">NFT Initial Price (ETH)</label>
        <input
          type="number"
          placeholder="e.g. 0.05"
          className="w-full px-4 py-2 rounded-md border border-paragraph/60 bg-black/30 text-white placeholder-gray-400 focus:border-action-btn-green focus:outline-none"
          onChange={(e) =>
            setFormData({ ...formData, nftPrice: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full max-w-md bg-action-btn-green text-black font-medium py-3 rounded-md hover:bg-[#aaff4d] transition-colors cursor-pointer"
      >
        Mint NFT
      </button>
      <ToastContainer />
    </form>
  );
};

export default MintNFT;
