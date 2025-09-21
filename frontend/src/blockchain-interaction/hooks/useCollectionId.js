import { useEffect, useState } from "react";
import useConstants from "./useConstants.js";
import { getReadContract } from "../helpers/contractHelper.js";

const useCollectionId = () => {
  const { contractAddress, contractABI } = useConstants();
  const [collectionId, setCollectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCollectionId() {
      try {
        const contract = getReadContract(contractAddress, contractABI);
        const id = await contract.collectionId();
        if (mounted) {
          setCollectionId(id.toString()); // cast BigInt to string
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error reading collectionId:", err);
        if (mounted) {
          setError(err);
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    fetchCollectionId();

    return () => {
      mounted = false;
    };
  }, [contractAddress, contractABI]);

  return { collectionId, isLoading, isError, error };
};

export default useCollectionId;
