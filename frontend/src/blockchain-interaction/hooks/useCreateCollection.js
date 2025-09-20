import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import deployment from "../../../contracts/broadcast/NftsMarketPlace.s.sol/31337/run-latest.json";
import abi from "../../../contracts/out/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const contractAddress = deployment.transactions[0].contractAddress;

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
    console.log("createCollectionOnChain called with:", {
      name,
      symbol,
      contractAddress,
    });
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: abi.abi,
        functionName: "createCollection",
        args: [name, symbol],
        chainId: 31337, // Anvil's default chainId
      });
      console.log("Transaction sent:", tx);
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
