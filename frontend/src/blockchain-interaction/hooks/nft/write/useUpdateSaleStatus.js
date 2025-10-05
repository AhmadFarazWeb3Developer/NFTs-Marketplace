import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import useReadSingleCollection from "../read/useReadSingleCollection";

const useUpdateSaleStatus = () => {
  const { getNFTCollectionInstance } = useReadSingleCollection();

  const updateSaleStatus = async (instance, tokenId, saleStaus) => {
    try {
      await tx.wait();
      console.log(tx.hash);
    } catch (error) {
      const decoded = decodeCollectionRevert(error);
      console.log(decoded);

      console.log("decoded error : ", decoded.name);
    }
  };

  return { updateSaleStatus };
};
export default useUpdateSaleStatus;
