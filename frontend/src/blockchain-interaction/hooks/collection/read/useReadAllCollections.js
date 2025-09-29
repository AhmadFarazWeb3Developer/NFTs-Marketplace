// import { useEffect, useState } from "react";
// import useReadFactoryContract from "../../factory/useReadFactoryContract";
// import useCollectionId from "./useCollectionId";

// const useReadAllCollections = () => {
//   const { factoryReadInstance } = useReadFactoryContract();
//   const { collectionId } = useCollectionId();

//   const [collections, setCollections] = useState([]);
//   const [accountAddresses, setAccountAddresses] = useState([]);

//   useEffect(() => {
//     const fetchAndReadCollections = async () => {
//       try {
//         // Step 1: fetch API
//         const response = await fetch("http://localhost:3000/api/v1/collection");
//         if (!response.ok) throw new Error("API request failed");
//         const collectionApi = await response.json();

//         const addrs = collectionApi?.data?.map((c) => c.accountAddress) || [];
//         setAccountAddresses(addrs);

//         if (!factoryReadInstance || collectionId === null || !addrs) return;

//         const results = [];
//         for (let i = 0; i < collectionId; i++) {
//           const collection = await factoryReadInstance.collections(
//             i,
//             accountAddresses[i]
//           );

//           results.push(collection);
//         }

//         console.log(results);
//         setCollections(results);
//       } catch (err) {
//         console.error("Error in fetchAndReadCollections:", err);
//       }
//     };

//     fetchAndReadCollections();
//   }, [factoryReadInstance, collectionId]);

//   return { collections, accountAddresses };
// };

// export default useReadAllCollections;

import { useEffect, useState } from "react";
import useReadFactoryContract from "../../factory/useReadFactoryContract";
import useCollectionId from "./useCollectionId";

const useReadAllCollections = () => {
  const { factoryReadInstance } = useReadFactoryContract();
  const { collectionId } = useCollectionId();

  const [collections, setCollections] = useState([]);
  const [accountAddresses, setAccountAddresses] = useState([]);

  useEffect(() => {
    const fetchAndReadCollections = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/collection");
        if (!response.ok) throw new Error("API request failed");
        const collectionApi = await response.json();

        const addrs = collectionApi?.data?.map((c) => c.accountAddress) || [];
        setAccountAddresses(addrs);

        if (!factoryReadInstance || collectionId === null || addrs.length === 0)
          return;

        const results = [];
        for (let i = 0; i < addrs.length; i++) {
          const collection = await factoryReadInstance.collections(i, addrs[i]);
          results.push({ collection, accountAddress: addrs[i] });
        }

        setCollections(results);
      } catch (err) {
        console.error("Error in fetchAndReadCollections:", err);
      }
    };

    fetchAndReadCollections();
  }, [factoryReadInstance, collectionId]);

  return { collections, accountAddresses };
};

export default useReadAllCollections;
