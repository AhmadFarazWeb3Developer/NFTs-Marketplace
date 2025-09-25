import { ethers } from "ethers";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import useAuthenticate from "../../../helpers/Auth";

const useReadSingleCollection = () => {
  const { error, signer } = useAuthenticate();

  const getNFTCollectionInstance = async (collectionAddress) => {
    if (error) {
      console.log(error);
    }

    const instance = new ethers.Contract(
      collectionAddress,
      NFTsCollectionABI.abi,
      signer
    );

    return instance;
  };

  return { getNFTCollectionInstance };
};

export default useReadSingleCollection;
