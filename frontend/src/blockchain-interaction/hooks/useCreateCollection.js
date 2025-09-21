import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import useConstants from "./useConstants";

const { contractAddress, contractABI, anvilChainId } = useConstants();

const useCreateCollection = () => {
  const {
    writeContractAsync,
    data: txHash,
    error,
    isPending,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const createCollectionOnChain = async (name, symbol) => {
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "createCollection",
        args: [name, symbol],
        chainId: anvilChainId,
      });

      return tx;
    } catch (err) {
      console.error("Blockchain transaction error:", err);
      throw err;
    }
  };

  return {
    createCollectionOnChain,
    txHash,
    error,
    isPending,
    isConfirming,
    isSuccess,
    isError,
  };
};

export default useCreateCollection;
