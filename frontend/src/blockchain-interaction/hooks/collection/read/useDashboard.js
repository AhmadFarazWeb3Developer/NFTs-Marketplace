// import { useState } from "react";
// import useCollectionStore from "../../../stores/useCollectionStore.store";
// import { useAppKitAccount } from "@reown/appkit/react";

// const useDashboard = () => {
//   const { collections } = useCollectionStore();

//   const { address, isConnected } = useAppKitAccount();
//   const [userCollections, setUserCollection] = useState([]);

//   const fetchUserCollections = async () => {
//     if (isConnected) {
//       const fetchCollections = async () => {
//         if (isConnected && address) {
//           const userCollections = collections
//             .filter((c) => c.accountAddress === address) // keep only connected account
//             .map((c) => c.collectionAddress); // extract only collectionAddress

//           setUserCollection(userCollections);
//         }
//       };
//       fetchCollections();
//     }
//   };
// };

// export default useDashboard;

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
        .filter((c) => c.accountAddress === address) // match user account
        .map((c) => c.collectionAddress); // only keep collectionAddress

      setUserCollections(filtered);
    } else {
      setUserCollections([]); // reset when disconnected
    }
  }, [isConnected, address, collections]);

  return { userCollections };
};

export default useDashboard;
