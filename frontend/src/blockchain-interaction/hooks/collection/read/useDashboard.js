import { useState, useEffect } from "react";
import useCollectionStore from "../../../stores/useCollectionStore.store";
import { useAppKitAccount } from "@reown/appkit/react";
import useReadFactoryInstanceStore from "../../../stores/useReadFactoryInstanceStore.store";
import useReadFactoryContract from "../../factory/useReadFactoryContract";
import useReadSingleCollection from "../../nft/read/useReadSingleCollection";

const useDashboard = () => {
  useReadFactoryContract();
  const { collections } = useCollectionStore();
  const { address, isConnected } = useAppKitAccount();
  const [userCollections, setUserCollections] = useState([]);
  const { factoryReadInstance } = useReadFactoryInstanceStore();
  const { getNFTCollectionInstance } = useReadSingleCollection();

  useEffect(() => {
    const fetchCollections = async () => {
      if (!isConnected || !address) {
        setUserCollections([]);
        return;
      }
      if (!factoryReadInstance) return;

      // Filter collections for this user
      const matched = collections.filter((c) => c.accountAddress === address);

      // Fetch ids for each collection and merge
      const enriched = await Promise.all(
        matched.map(async (c) => {
          const collection = await getNFTCollectionInstance(
            c.collectionAddress
          );
          const collectionId = await factoryReadInstance.collectionAddressToId(
            c.collectionAddress
          );

          // rename collectionAddress -> collection
          return {
            ...c,
            collection, // override with instance
            collectionId,
          };
        })
      );

      setUserCollections(enriched);
    };

    fetchCollections();
  }, [isConnected, address, collections, factoryReadInstance]);

  return { userCollections };
};

export default useDashboard;
