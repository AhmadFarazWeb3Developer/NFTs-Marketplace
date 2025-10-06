import { useState } from "react";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import useReadSingleCollection from "../read/useReadSingleCollection";

const useUpdateSaleStatus = () => {
  const [error, setError] = useState("");

  const { getNFTCollectionInstance } = useReadSingleCollection();

  const updateSaleStatus = async (instance, tokenId, saleStaus) => {
    try {
      await tx.wait();
      console.log(tx.hash);
    } catch (error) {
      const decoded = decodeCollectionRevert(error);

      console.log("decoded error : ", decoded.name);
      setError(decoded?.name || decoded || "Transaction failed.");
    }
  };

  return { updateSaleStatus, error };
};
export default useUpdateSaleStatus;
