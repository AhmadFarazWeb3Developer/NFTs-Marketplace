import { useState } from "react";
import useWriteFactoryContract from "../../factory/useWriteFactoryContract";
import useReadFactoryInstanceStore from "../../../stores/useReadFactoryInstanceStore.store";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";

const useCreateCollection = () => {
  const { factoryWriteInstance, isLoading, signer } = useWriteFactoryContract();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [collectionAddress, setCollectionAddress] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);
  const [collectionEventInfo, setCollectionEventInfo] = useState(null);

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
      // 🔹 Execute transaction
      const tx = await factoryWriteInstance.createCollection(name, symbol);
      setTxHash(tx.hash);

      // 🔹 Wait for confirmation
      const receipt = await tx.wait();

      let collectionCreatedEvent = null;

      for (const log of receipt.logs) {
        try {
          const parsed = factoryReadInstance.interface.parseLog(log);

          if (parsed.name === "CollectionCreated") {
            console.log("CollectionCreated event:", parsed.args);

            const collectionId = parsed.args[0].toString();
            const creator = parsed.args[1];
            const collectionAddress = parsed.args[2];

            collectionCreatedEvent = {
              collectionId,
              creator,
              collectionAddress,
            };
            setCollectionEventInfo(collectionCreatedEvent);

            console.log("Collection ID:", collectionId);
            console.log("Creator:", creator);
            console.log("Collection Address:", collectionAddress);
          }
        } catch (e) {
          // Ignore unrelated logs
        }
      }

      if (!collectionCreatedEvent) {
        throw new Error(
          "CollectionCreated event not found in transaction logs"
        );
      }

      const safeId =
        collectionCreatedEvent.collectionId <= Number.MAX_SAFE_INTEGER
          ? Number(collectionCreatedEvent.collectionId)
          : collectionCreatedEvent.collectionId;

      setCollectionId(safeId);
      setAccountAddress(collectionCreatedEvent.creator);
      setCollectionAddress(collectionCreatedEvent.collectionAddress);
      setIsSuccess(true);
    } catch (err) {
      const decode = decodeCollectionRevert(err);
      setError(decode.name || err.message);
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
    setCollectionAddress(null);
    setAccountAddress(null);
    setCollectionEventInfo(null);
  };

  return {
    createCollectionOnChain,
    reset,
    txHash,
    collectionId,
    collectionAddress,
    accountAddress,
    isPending,
    isSuccess,
    isError: !!error,
    error,
    isLoading,
    signer,
    collectionEventInfo,
  };
};

export default useCreateCollection;
