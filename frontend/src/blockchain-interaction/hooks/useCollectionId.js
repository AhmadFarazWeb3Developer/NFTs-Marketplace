import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import useConstants from "./useConstants.js";

const useCollectionId = () => {
  const { contractAddress, contractABI } = useConstants();
  const { callContract } = useAppKit(); // AppKit function to call read-only contract functions

  const [collectionId, setCollectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollectionId = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const result = await callContract({
        to: contractAddress,
        abi: contractABI,
        functionName: "collectionId",
        args: [], // no args needed
      });

      // Convert BigInt to string if necessary
      setCollectionId(result?.toString());
    } catch (err) {
      console.error("Error fetching collectionId:", err);
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionId();
  }, []);

  return {
    collectionId,
    isLoading,
    isError,
    error,
    refetch: fetchCollectionId,
  };
};

export default useCollectionId;
