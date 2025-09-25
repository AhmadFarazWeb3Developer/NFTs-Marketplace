import { useEffect, useState } from "react";
import useReadContract from "./useReadContract.js";

const useCollectionId = () => {
  const { factoryReadInstance } = useReadContract();

  const [collectionId, setCollectionId] = useState(null);

  const fetchCollectionId = async () => {
    if (!factoryReadInstance) {
      return;
    }

    try {
      const result = await factoryReadInstance.collectionId();

      setCollectionId(result?.toString());
    } catch (err) {
      console.error("Error fetching collectionId:", err);
    }
  };

  useEffect(() => {
    if (factoryReadInstance) {
      fetchCollectionId();
    }
  }, [factoryReadInstance]);

  return {
    collectionId,
    refetch: fetchCollectionId,
  };
};

export default useCollectionId;
