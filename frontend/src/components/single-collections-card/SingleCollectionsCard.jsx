import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";

const SingleCollectionsCard = ({
  tokenId,
  tokenPrice,
  collectionInstance,
  tokenURI,
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
        className="card border-1 border-paragraph/50 rounded-md flex flex-col items-center gap-2 pb-2 bg-black/20 
                   transition-all duration-300 ease-in-out transform hover:scale-105"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="rounded-md overflow-hidden w-full">
          {/* <img
            src={stripBeforeHttp(tokenURI)}
            alt=""
            className="rounded-md w-full"
          /> */}

          <img
            src={stripBeforeHttp(tokenURI)}
            alt=""
            className="rounded-md w-full h-64 object-cover"
          />
        </div>

        <div
          className={`w-full px-2 py-2 flex flex-col items-center gap-2 transition-all duration-300 ease-in-out
                      ${
                        hover
                          ? "opacity-100 translate-y-0"
                          : "opacity-90 -translate-y-1"
                      }`}
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="font-medium text-action-btn-green">
              {tokenPrice} ETH
            </h3>
            <p className="text-paragraph text-sm font-medium">#{tokenId}</p>
          </div>

          {/* Owner address + copy */}
          <div
            className="flex items-center gap-2 text-sm font-light transition-all duration-300 ease-in-out
                       cursor-pointer text-paragraph hover:text-green-400"
            onClick={copyToClipboard}
          >
            <span className="tracking-wider">{truncateAddress(owner)}</span>
            <FaRegCopy className="hover:text-green-400 transition-colors duration-200" />
          </div>

          {/* Buy button */}
          {hover && (
            <button
              className="w-full bg-action-btn-green font-light text-black py-1 rounded-sm cursor-pointer 
                         transition-all duration-300 ease-in-out transform hover:scale-105"
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
          )}
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default SingleCollectionsCard;
