import { useEffect, useState } from "react";
import useReadContract from "./useReadContract";
import useCollectionId from "./useCollectionId";

const useReadCollections = () => {
  const { factoryReadInstance } = useReadContract();
  const { collectionId } = useCollectionId();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!factoryReadInstance || collectionId === null) return;

    const init = async () => {
      try {
        const results = [];
        for (let i = 0; i < collectionId; i++) {
          const collection = await factoryReadInstance.collections(
            i,
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
          );
          results.push(collection);
        }
        setCollections(results);
      } catch (err) {
        console.error("Error reading collections:", err);
      }
    };

    init();
  }, [factoryReadInstance, collectionId]);

  return { collections };
};

export default useReadCollections;
