import { useState } from "react";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import useReadSingleCollection from "../read/useReadSingleCollection";

const useUpdateSaleStatus = () => {
  const [error, setError] = useState("");
  const { getNFTCollectionInstance } = useReadSingleCollection();

  // ✅ instance = collectionInstance passed from parent component
  const updateSaleStatus = async (instance, tokenId, saleStatus) => {
    try {
      if (!instance) throw new Error("Collection instance not found");
      if (!tokenId) throw new Error("Token ID is required");

      const tx = await instance.updateSaleStatus(tokenId, saleStatus);
      await tx.wait();

      console.log("Transaction successful:", tx.hash);
      return tx.hash;
    } catch (err) {
      console.error("Transaction failed:", err);

      const decoded = decodeCollectionRevert(err);
      setError(decoded?.name || decoded || "Transaction failed.");
    }
  };

  return { updateSaleStatus, error };
};

export default useUpdateSaleStatus;
