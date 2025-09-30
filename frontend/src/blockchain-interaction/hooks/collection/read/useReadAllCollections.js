import { useEffect, useState } from "react";
import useCollectionId from "./useCollectionId";
import useCollectionStore from "../../../stores/useCollectionStore.store";
import useReadFactoryInstanceStore from "../../../stores/useReadFactoryInstanceStore.store";

const useReadAllCollections = () => {
  const { collectionId } = useCollectionId();
  const { setCollections, collections } = useCollectionStore();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  useEffect(() => {
    const fetchAndReadCollections = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/collection");
        if (!response.ok) throw new Error("API request failed");
        const collectionApi = await response.json();

        const addrs = collectionApi?.data?.map((c) => c.accountAddress) || [];

        if (!factoryReadInstance || collectionId === null || addrs.length === 0)
          return;

        const results = [];
        for (let i = 0; i < addrs.length; i++) {
          const collectionAddress = await factoryReadInstance.collections(
            i,
            addrs[i]
          );

          results.push({ collectionAddress, accountAddress: addrs[i] });
        }
        setCollections(results);
      } catch (err) {
        console.error("Error in fetchAndReadCollections:", err);
      }
    };

    fetchAndReadCollections();
  }, [factoryReadInstance, collectionId]);
};

export default useReadAllCollections;
