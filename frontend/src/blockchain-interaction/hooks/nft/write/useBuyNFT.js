import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import useReadAllCollections from "../../collection/read/useReadAllCollections";
import useReadSingleCollection from "../read/useReadSingleCollection";

const useBuyNFT = () => {
  const { getNFTCollectionInstance } = useReadSingleCollection();
  const { collections } = useReadAllCollections();

  const buyNFT = async (tokenId) => {
    try {
      const instance = await getNFTCollectionInstance(collections[0]);

      const price = ethers.parseEther("1.0");

      const tx = await instance.buy(tokenId, {
        value: price,
      });
      await tx.wait();
    } catch (error) {
      const decoded = decodeCollectionRevert(error);
      console.log(decoded);
    }
  };

  return { buyNFT };
};

export default useBuyNFT;
