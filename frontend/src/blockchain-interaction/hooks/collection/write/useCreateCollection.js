import { useState } from "react";
import useWriteFactoryContract from "./useWriteFactoryContract";

const useCreateCollection = () => {
  const { factoryWriteInstance, isLoading } = useWriteFactoryContract();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [collectionId, setCollectionId] = useState(null);

  const createCollectionOnChain = async (name, symbol) => {
    // Reset state
    setIsPending(true);
    setIsSuccess(false);
    setError(null);
    setTxHash(null);
    setCollectionId(null);

    if (isLoading) {
      setError(new Error("Contract is initializing, please wait"));
      setIsPending(false);
      return;
    }

    if (!factoryWriteInstance) {
      setError(new Error("Wallet not connected or contract not available"));
      setIsPending(false);
      return;
    }

    if (!name || !symbol) {
      setError(new Error("Collection name and symbol are required"));
      setIsPending(false);
      return;
    }

    try {
      console.log("Creating collection with:", { name, symbol });

      // Send transaction
      const tx = await factoryWriteInstance.createCollection(name, symbol);
      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      // Parse CollectionCreated event to get collectionId
      const event = receipt.events?.find(
        (e) => e.event === "CollectionCreated"
      );
      if (event && event.args?.collectionId !== undefined) {
        const newId = event.args.collectionId.toNumber
          ? event.args.collectionId.toNumber()
          : Number(event.args.collectionId);
        setCollectionId(newId);
        console.log("New collectionId:", newId);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Error creating collection:", err);

      if (err.code === "ACTION_REJECTED") {
        setError(new Error("Transaction was rejected by user"));
      } else if (err.reason) {
        setError(new Error(`Contract error: ${err.reason}`));
      } else if (err.data?.message) {
        setError(new Error(`Contract revert: ${err.data.message}`));
      } else if (err.message.includes("revert")) {
        const revertMatch = err.message.match(
          /revert with reason string '(.*)'/
        );
        if (revertMatch)
          setError(new Error(`Transaction reverted: ${revertMatch[1]}`));
        else
          setError(
            new Error("Transaction reverted. Check contract requirements.")
          );
      } else {
        setError(err);
      }
    } finally {
      setIsPending(false);
    }
  };

  const reset = () => {
    setIsPending(false);
    setIsSuccess(false);
    setError(null);
    setTxHash(null);
    setCollectionId(null);
  };

  return {
    createCollectionOnChain,
    reset,
    txHash,
    collectionId,
    isPending,
    isSuccess,
    isError: !!error,
    error,
    isLoading,
  };
};

export default useCreateCollection;
