import { useState, useEffect } from "react";
import useCollectionStore from "../../../stores/useCollectionStore.store";
import { useAppKitAccount } from "@reown/appkit/react";

const useDashboard = () => {
  const { collections } = useCollectionStore();
  const { address, isConnected } = useAppKitAccount();
  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    if (isConnected && address) {
      const filtered = collections
        .filter((c) => c.accountAddress === address)
        .map((c) => c.collectionAddress);

      setUserCollections(filtered);
    } else {
      setUserCollections([]);
    }
  }, [isConnected, address, collections]);

  return { userCollections };
};

export default useDashboard;
