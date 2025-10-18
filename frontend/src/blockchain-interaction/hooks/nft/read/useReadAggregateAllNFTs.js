import { useEffect, useState } from "react";
import useReadAllCollections from "../../collection/read/useReadAllCollections";
import useCollectionStore from "../../../stores/useCollectionStore.store";
import useReadSingleCollection from "./useReadSingleCollection";

const useReadAggregateAllNFTs = () => {
  useReadAllCollections();
  const { collections } = useCollectionStore();

  const { getNFTCollectionInstance } = useReadSingleCollection();

  const [allNfts, setAllNfts] = useState([]);

  useEffect(() => {
    const fetchAllNFTs = async () => {
      if (!collections || collections.length === 0) return;

      const nftResults = [];

      console.log("collection :", collections);

      for (const col of collections) {
        try {
          const collectionInstance = await getNFTCollectionInstance(
            col.collectionAddress
          );

          console.log(collectionInstance);

          for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
            const [tokenURI, owner] = await Promise.all([
              collectionInstance.tokenURI(tokenId),
              collectionInstance.ownerOf(tokenId),
            ]);

            nftResults.push({
              tokenId,
              tokenURI,
              owner,
              collectionAddress: col.collectionAddress,
              image: col.image,
            });
          }
        } catch (err) {
          console.error(
            `Error reading NFTs from ${col.collectionAddress}:`,
            err
          );
        }
      }

      setAllNfts(nftResults);
    };

    fetchAllNFTs();
  }, [collections]);

  return allNfts;
};

export default useReadAggregateAllNFTs;
