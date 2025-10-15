import { ethers } from "ethers";
import React from "react";

const MintNFTToast = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div
        className="flex flex-col font-light gap-3 p-5 bg-[rgba(255,255,255,0.05)] 
                   backdrop-blur-md border border-[rgba(192,192,192,0.2)] 
                   rounded-2xl shadow-lg font-unbounded text-[var(--color-paragraph)]"
        style={{ fontFamily: "var(--font-unbounded)" }}
      >
        <div className="text-lg text-[var(--color-action-btn-green)]">
          No Events Found
        </div>

        <div className="border-t border-[rgba(192,192,192,0.2)] my-1"></div>

        <div className="text-sm text-white/85">
          No transaction events were detected for this mint.
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col font-light gap-3 p-5 bg-[rgba(255,255,255,0.05)] 
                 backdrop-blur-md border border-[rgba(192,192,192,0.2)] 
                 rounded-2xl shadow-lg font-unbounded text-[var(--color-paragraph)]"
      style={{ fontFamily: "var(--font-unbounded)" }}
    >
      <div className="text-lg text-[var(--color-action-btn-green)]">
        NFT Minted Successfully
      </div>

      <div className="border-t border-[rgba(192,192,192,0.2)] my-1"></div>

      {events.map((evt, index) => (
        <div key={index} className="text-sm break-all space-y-1">
          <div className="text-[var(--color-action-btn-green)] font-light">
            {evt.event}
          </div>

          {evt.event === "Transfer" && (
            <>
              <div className="flex gap-1">
                <span className="text-gray-400">From:</span>
                <span className="text-white/90">{evt.from}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400">To:</span>
                <span className="text-white/90">{evt.to}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400">Token ID:</span>
                <span className="text-white/90">{evt.tokenId}</span>
              </div>
            </>
          )}

          {evt.event === "TokenPriceUpdated" && (
            <>
              <div className="flex gap-1">
                <span className="text-gray-400">Token ID:</span>
                <span className="text-white/90">{evt.tokenID}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400">Old Price:</span>
                <span className="text-white/90">
                  {ethers.formatEther(evt.oldPrice)} ETH
                </span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400">New Price:</span>
                <span className="text-white/90">
                  {ethers.formatEther(evt.newPrice)} ETH
                </span>
              </div>
            </>
          )}

          {index !== events.length - 1 && (
            <div className="border-t border-[rgba(192,192,192,0.15)] my-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MintNFTToast;
