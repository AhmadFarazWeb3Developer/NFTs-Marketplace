import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const MintNFT = () => {
  return (
    <>
      <div className="mint-nft text-white font-unbounded">
        <h1>
          Mint <span>NFT</span>
        </h1>

        <div className="flex flex-col items-center justify-center">
          <FaCloudUploadAlt />
          Upload Your NFT Image
        </div>

        <div>
          <input
            type="number"
            className=""
            placeholder="Set NFT intial price in ETH"
          />
        </div>
      </div>
    </>
  );
};

export default MintNFT;
