import { useEffect } from "react";
import useReadContract from "./useReadContract";
import useCollectionId from "./useCollectionId";

const useReadCollections = () => {
  const { factoryReadInstance } = useReadContract();
  const { collectionId } = useCollectionId();

  useEffect(() => {
    if (!factoryReadInstance || collectionId === null) return;

    const init = async () => {
      for (let i = 0; i < collectionId; i++) {
        try {
          const collection = await factoryReadInstance.collections(
            i,
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
          );
          console.log(`Collection ${i}:`, collection);
        } catch (err) {
          console.error(`Error reading collection ${i}:`, err);
        }
      }
    };

    init();
  }, [factoryReadInstance, collectionId]);
};

export default useReadCollections;
