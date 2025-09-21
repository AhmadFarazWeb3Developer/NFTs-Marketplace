import { useReadContract } from "wagmi";
import useConstants from "./useConstants.js";

const { contractAddress, contractABI, anvilChainId } = useConstants();

const useCollectionId = () => {
  const { data, error, isLoading, isError } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "collectionId",
    chainId: anvilChainId,
  });

  return {
    collectionId: data,
    isLoading,
    isError,
    error,
  };
};

export default useCollectionId;
