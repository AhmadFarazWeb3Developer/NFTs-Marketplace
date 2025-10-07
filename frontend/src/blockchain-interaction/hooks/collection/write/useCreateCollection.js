import { useEffect, useState } from "react";
import useWriteFactoryContract from "../../factory/useWriteFactoryContract";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
const useCreateCollection = () => {
  const { factoryWriteInstance, isLoading, signer } = useWriteFactoryContract();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [collectionAddress, setCollectionAddress] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);

  const createCollectionOnChain = async (name, symbol) => {
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
      const tx = await factoryWriteInstance.createCollection(name, symbol);
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      // console.log("Transaction confirmed:", receipt);

      let collectionCreatedEvent = null;

      for (const log of receipt.logs) {
        try {
          const parsedLog = factoryWriteInstance.interface.parseLog(log);

          if (parsedLog && parsedLog.name === "CollectionCreated") {
            collectionCreatedEvent = parsedLog;
            break;
          }
        } catch (error) {
          continue;
        }
      }

      if (!collectionCreatedEvent) {
        throw new Error(
          "CollectionCreated event not found in transaction logs"
        );
      }

      const {
        collectionId: newCollectionId,
        owner,
        collectionAddress,
      } = collectionCreatedEvent.args;

      // Convert BigInt to number if safe, otherwise keep as BigInt
      const safeId =
        newCollectionId <= Number.MAX_SAFE_INTEGER
          ? Number(newCollectionId)
          : newCollectionId;

      setCollectionId(safeId);
      setAccountAddress(owner);
      setCollectionAddress(collectionAddress);
      setIsSuccess(true);
    } catch (err) {
      const decode = decodeCollectionRevert(err);
      setError(decode.name);
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
    collectionAddress,
    accountAddress,
    isPending,
    isSuccess,
    isError: !!error,
    error,
    isLoading,
    signer,
  };
};

export default useCreateCollection;
