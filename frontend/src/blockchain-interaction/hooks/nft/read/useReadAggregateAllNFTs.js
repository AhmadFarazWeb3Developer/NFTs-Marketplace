import { useEffect, useState } from "react";
import useReadAllCollections from "../../collection/read/useReadAllCollections";
import useCollectionStore from "../../../stores/useCollectionStore.store";
import useReadSingleCollection from "./useReadSingleCollection";
import { formatEther } from "ethers";

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

          const totalSupply = await collectionInstance.tokenId();

          for (let tokenId = 0; tokenId < Number(totalSupply); tokenId++) {
            const [tokenURI, name, symbol, price, owner, isForSale] =
              await Promise.all([
                collectionInstance.tokenURI(tokenId),
                collectionInstance.name(),
                collectionInstance.symbol(),
                collectionInstance.tokenPrice(tokenId),
                collectionInstance.ownerOf(tokenId),
                collectionInstance.isForSale(tokenId),
              ]);

            const tokenPrice = formatEther(price);
            nftResults.push({
              tokenURI,
              name,
              symbol,
              tokenId,
              tokenPrice,
              owner,
              isForSale,
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
