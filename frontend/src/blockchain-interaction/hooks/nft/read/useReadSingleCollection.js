import { ethers } from "ethers";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import useAuthenticate from "../../../helpers/Auth";

const useReadSingleCollection = () => {
  const { error, signer } = useAuthenticate();

  const getNFTCollectionInstance = async (collectionAddress) => {
    if (error) {
      console.log(error);
    }

    console.log(signer);
    const runner = await signer;

    return new ethers.Contract(
      await collectionAddress,
      NFTsCollectionABI.abi,
      runner
    );
  };

  return { getNFTCollectionInstance, signer };
};

export default useReadSingleCollection;
