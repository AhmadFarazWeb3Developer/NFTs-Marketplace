import { ethers } from "ethers";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import useAuthenticate from "../../../helpers/Auth";

const useReadSingleCollection = () => {
  const { error, signer } = useAuthenticate();

  const getNFTCollectionInstance = async (collectionAddress) => {
    if (error) {
      console.log(error);
    }

    const runner =
      (await signer) ?? new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    return new ethers.Contract(
      await collectionAddress,
      NFTsCollectionABI.abi,
      runner
    );
  };

  return { getNFTCollectionInstance };
};

export default useReadSingleCollection;
