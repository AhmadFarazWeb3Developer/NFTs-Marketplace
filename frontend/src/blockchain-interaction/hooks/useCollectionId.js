import { useEffect, useState } from "react";
import useReadContract from "./useReadContract.js";

const useCollectionId = () => {
  const { factoryInstance } = useReadContract();

  const [collectionId, setCollectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollectionId = async () => {
    if (!factoryInstance) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const result = await factoryInstance.collectionId();

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
    if (factoryInstance) {
      fetchCollectionId();
    }
  }, [factoryInstance]);

  return {
    collectionId,
    isLoading,
    isError,
    error,
    refetch: fetchCollectionId,
  };
};

export default useCollectionId;
