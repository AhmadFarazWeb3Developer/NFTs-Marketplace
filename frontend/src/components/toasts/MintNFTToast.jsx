import { ethers } from "ethers";
import React from "react";

const MintNFTToast = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-sm text-[var(--color-paragraph)] font-unbounded bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(192,192,192,0.2)] rounded-2xl shadow-lg p-5 w-fit">
        <p>No events found for this transaction.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col font-light gap-3 p-5 w-fit bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(192,192,192,0.2)] rounded-2xl shadow-lg font-unbounded text-[var(--color-paragraph)]"
      style={{
        fontFamily: "var(--font-unbounded)",
      }}
    >
      <div className="text-lg text-[var(--color-action-btn-green)]">
        NFT Minted Successfully
      </div>

      {events.map((evt, index) => (
        <div key={index} className="mt-1">
          <div className="border-t border-[rgba(192,192,192,0.2)] my-2"></div>

          <div className="text-sm font-semibold text-[var(--color-action-btn-green)] mb-1">
            {evt.event} Event
          </div>

          {evt.event === "Transfer" && (
            <div className="text-sm break-all space-y-1">
              <div>
                <span className="font-medium text-white/90">From:</span>{" "}
                {evt.from}
              </div>
              <div>
                <span className="font-medium text-white/90">To:</span> {evt.to}
              </div>
              <div>
                <span className="font-medium text-white/90">Token ID:</span>{" "}
                {evt.tokenId}
              </div>
            </div>
          )}

          {evt.event === "TokenPriceUpdated" && (
            <div className="text-sm break-all space-y-1">
              <div>
                <span className="font-medium text-white/90">Token ID:</span>{" "}
                {evt.tokenID}
              </div>
              <div>
                <span className="font-medium text-white/90">Old Price:</span>{" "}
                {ethers.formatEther(evt.oldPrice)}
              </div>
              <div>
                <span className="font-medium text-white/90">New Price:</span>{" "}
                {ethers.formatEther(evt.newPrice)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MintNFTToast;
