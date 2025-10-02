import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMintNFT from "../../blockchain-interaction/hooks/nft/write/useMintNFT";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";

const SingleCollectionsCard = ({ tokenId, tokenPrice, collectionInstance }) => {
  useReadFactoryContract();

  const [hover, setHover] = useState("notHovered");
  const navigateTo = useNavigate("");

  return (
    <>
      <div className="card border-1 border-paragraph/50 rounded-md flex justify-center flex-col items-center gap-2 pb-2 bg-black/20">
        <div className="rounded-md">
          <img src="/scifiHumanoid.jpg" alt="" className="rounded-md" />
        </div>

        {hover === "notHovered" && (
          <div
            className="flex justify-between items-center w-full px-2 my-2 cursor-pointer 
                       transition-all duration-00 ease-in-out opacity-100"
            onMouseEnter={() => setHover("hovered")}
          >
            <h3>{tokenPrice} ETH</h3>
            <p className="font-light text-paragraph text-sm">#{tokenId}</p>
          </div>
        )}

        {hover === "hovered" && (
          <div
            className="w-full px-2 transition-all duration-300 ease-in-out opacity-100"
            onMouseLeave={() => setHover("notHovered")}
          >
            <button
              className="w-full bg-action-btn-green font-light text-black py-1 rounded-sm cursor-pointer 
                         transition-all duration-300 ease-in-out"
              onClick={() =>
                navigateTo(`/explore/buyNft/${tokenId}`, {
                  state: {
                    tokenId,
                    tokenPrice,
                    collectionAddress: collectionInstance.target,
                  },
                })
              }
            >
              BUY NOW
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCollectionsCard;
