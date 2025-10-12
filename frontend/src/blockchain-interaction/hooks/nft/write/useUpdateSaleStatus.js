import { useState } from "react";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";

const useUpdateSaleStatus = () => {
  const [error, setError] = useState("");

  const updateSaleStatus = async (instance, tokenId, saleStatus) => {
    try {
      if (!instance) throw new Error("Collection instance not found");
      if (!tokenId) throw new Error("Token ID is required");

      const tx = await instance.updateSaleStatus(tokenId, saleStatus);
      const receipt = await tx.wait();

      let eventInfo = null;

      for (const log of receipt.logs) {
        try {
          const parsed = instance.interface.parseLog(log);
          if (parsed.name === "TokenIdSaleStatusUpdated") {
            eventInfo = {
              updatedBy: parsed.args.updatedBy,
              tokenID: parsed.args.tokenID.toString(),
              isAllowed: parsed.args.isAllowed,
            };
            break;
          }
        } catch (err) {
          // Ignore logs that don't match
        }
      }

      if (!eventInfo) {
        console.warn("TokenIdSaleStatusUpdated event not found in receipt");
      }

      return { txHash: tx.hash, eventInfo };
    } catch (err) {
      console.error("Transaction failed:", err);
      const decoded = decodeCollectionRevert(err);
      setError(decoded?.name || decoded || "Transaction failed.");
    }
  };

  return { updateSaleStatus, error };
};

export default useUpdateSaleStatus;
