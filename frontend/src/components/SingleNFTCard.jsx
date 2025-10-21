import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";

const SingleNFTCard = ({
  tokenId,
  tokenPrice,
  collectionInstance,
  tokenURI,
  image,
  layout,
}) => {
  useReadFactoryContract();

  const [hover, setHover] = useState(false);
  const [owner, setOwner] = useState(null);
  const navigateTo = useNavigate("");

  useEffect(() => {
    const init = async () => {
      if (collectionInstance) {
        try {
          const ownerAddress = await collectionInstance.ownerOf(tokenId);
          setOwner(ownerAddress);
        } catch (err) {
          console.error("Error fetching owner:", err);
        }
      }
    };
    init();
  }, [tokenId, collectionInstance]);

  const truncateAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 9) + "..." + address.slice(-6);
  };

  const copyToClipboard = async () => {
    if (owner) {
      try {
        await navigator.clipboard.writeText(owner);
        toast.success("Address copied to clipboard!", { autoClose: 1500 });
      } catch (err) {
        toast.error("Failed to copy address");
        console.error("Failed to copy:", err);
      }
    }
  };

  const stripBeforeHttp = (str) => {
    if (!str || typeof str !== "string") return "";
    if (str.startsWith("http://") || str.startsWith("https://")) return str;

    const httpIndex = str.indexOf("http");
    if (httpIndex !== -1) return str.substring(httpIndex);

    const slashIndex = str.indexOf("/");
    if (slashIndex !== -1) return `https://${str.substring(slashIndex + 1)}`;

    return `https://${str}`;
  };

  return (
    <>
      <div
        className={`card border border-paragraph/50 rounded-md bg-black/20 transition-all duration-400 ease-in-out transform hover:scale-105 w-1/5
    ${
      layout === "grid"
        ? "flex flex-col items-start gap-2 pb-2"
        : "flex flex-row items-center gap-4 p-3 w-full"
    }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`${
            layout === "grid"
              ? "w-full rounded-t-md"
              : "w-32 h-32 rounded-md overflow-hidden flex-shrink-0"
          }`}
        >
          <img
            src={stripBeforeHttp(tokenURI)}
            alt=""
            className={`object-cover w-full h-full ${
              layout === "grid" ? "rounded-t-md" : "rounded-md"
            }`}
          />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            layout === "grid"
              ? "w-full px-2 py-2 flex flex-col items-center gap-2"
              : "flex flex-col justify-between flex-1"
          } ${hover ? "opacity-100" : "opacity-90"}`}
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="font-medium text-action-btn-green text-sm sm:text-base md:text-lg">
              {tokenPrice} ETH
            </h3>
            <p className="text-paragraph text-xs sm:text-sm md:text-base font-medium">
              #{tokenId}
            </p>
          </div>

          <div
            className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-light transition-all duration-300 ease-in-out
                       cursor-pointer text-paragraph hover:text-green-400"
            onClick={copyToClipboard}
          >
            <span className="tracking-wider">{truncateAddress(owner)}</span>
            <FaRegCopy className="hover:text-green-400 transition-colors duration-200" />
          </div>

          {hover && (
            <button
              className="w-full bg-action-btn-green font-light text-black 
                         py-1 sm:py-1.5 md:py-2 rounded-sm cursor-pointer 
                         text-xs sm:text-sm md:text-base
                         transition-all duration-400 ease-in-out transform hover:scale-95 "
              onClick={() =>
                navigateTo(`/explore/buyNft/${tokenId}`, {
                  state: {
                    tokenId,
                    tokenPrice,
                    collectionAddress: collectionInstance.target,
                    NFTImage: stripBeforeHttp(tokenURI),
                    collectionImage: image,
                  },
                })
              }
            >
              BUY NOW
            </button>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default SingleNFTCard;
