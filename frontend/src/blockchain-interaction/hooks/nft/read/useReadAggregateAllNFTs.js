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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNFTs = async () => {
      if (!collections || collections.length === 0) {
        setLoading(false);
        return;
      }

      const nftResults = [];

      try {
        for (const col of collections) {
          const collectionInstance = await getNFTCollectionInstance(
            col.collectionAddress
          );

          console.log(col);
          const totalSupply = await collectionInstance.tokenId();

          for (let tokenId = 0; tokenId < Number(totalSupply); tokenId++) {
            const [
              tokenURI,
              name,
              symbol,
              price,
              owner,
              isForSale,
              collectionImage,
            ] = await Promise.all([
              collectionInstance.tokenURI(tokenId),
              collectionInstance.name(),
              collectionInstance.symbol(),
              collectionInstance.tokenPrice(tokenId),
              collectionInstance.ownerOf(tokenId),
              collectionInstance.isForSale(tokenId),
              col.image,
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
              collectionInstance: col,
              collectionImage,
            });
          }
        }

        setAllNfts(nftResults);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNFTs();
  }, [collections]);

  return { allNfts, loading };
};

export default useReadAggregateAllNFTs;
