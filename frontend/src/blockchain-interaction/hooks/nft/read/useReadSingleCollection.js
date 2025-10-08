import { ethers } from "ethers";
import { useCallback } from "react";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import useAuthenticate from "../../../helpers/Auth";

const useReadSingleCollection = () => {
  const { error, signer } = useAuthenticate();

  const getNFTCollectionInstance = useCallback(
    async (collectionAddress) => {
      if (error) {
        console.log(error);
      }

      console.log("Signer : ", signer);
      const runner = await signer;

      return new ethers.Contract(
        await collectionAddress,
        NFTsCollectionABI.abi,
        runner
      );
    },
    [signer, error]
  );

  return { getNFTCollectionInstance, signer };
};

export default useReadSingleCollection;
