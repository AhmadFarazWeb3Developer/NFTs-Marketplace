import { cloneElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useReadSingleCollection from "../../nft/read/useReadSingleCollection";
import useReadFactoryInstanceStore from "../../../stores/useReadFactoryInstanceStore.store";
import useReadFactoryContract from "../../factory/useReadFactoryContract";
import { ethers, formatEther } from "ethers";

const useCollectionNFTs = (refreshKey) => {
  useReadFactoryContract();

  const { factoryReadInstance } = useReadFactoryInstanceStore();
  const { getNFTCollectionInstance } = useReadSingleCollection();

  const { collection } = useParams();

  const [collectionInstance, setCollectionInstance] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const [avgPrice, setAvgPrice] = useState(null);
  const [totalWorth, setTotalWorth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [NFTsPricesAndIds, setNFTsPricesAndIds] = useState([]);
  const [tokenURIs, setTokenURIs] = useState([]);
  const [collectionOwner, sertCollectionOwner] = useState(null);

  const calculateAvgPrice = async (instance) => {
    let totalPrice = 0n;
    const supply = Number(await instance.tokenId());

    if (supply === 0) return "0.00";

    for (let tokenId = 0; tokenId < supply; tokenId++) {
      const price = await instance.tokenPrice(tokenId);
      totalPrice += price;
    }

    const avgPrice = totalPrice / BigInt(supply);

    const avgPriceInEth = parseFloat(formatEther(avgPrice)).toFixed(2);

    return avgPriceInEth;
  };

  const fetchNFTs = async () => {
    setIsLoading(true);

    try {
      const collectionId = Number(
        await factoryReadInstance.collectionAddressToId(collection)
      );

      const owner = await factoryReadInstance.ownerOfCollection(collection);

      const instance = await getNFTCollectionInstance(collection);

      const name = await instance.name();
      const id = Number(await instance.tokenId());
      const avgPrice = await calculateAvgPrice(instance);

      const tempData = [];
      const tempURIs = [];

      let worth = 0n;

      for (let tokenId = 0; tokenId < id; tokenId++) {
        const tokenPrice = await instance.tokenPrice(tokenId);
        worth += tokenPrice;
        const tokenURI = await instance.tokenURI(tokenId);
        tempData.push({ tokenId, tokenPrice: formatEther(tokenPrice) });
        tempURIs.push(tokenURI);
      }
      setCollectionInstance(instance);
      setCollectionName(name);
      setCollectionId(collectionId);
      setTotalItems(id);
      setAvgPrice(avgPrice);
      setTotalWorth(formatEther(worth));
      setNFTsPricesAndIds(tempData);
      setTokenURIs(tempURIs);
      sertCollectionOwner(owner);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!factoryReadInstance || !getNFTCollectionInstance || !collection)
      return;
    fetchNFTs();
  }, [factoryReadInstance, getNFTCollectionInstance, collection, refreshKey]);

  return {
    collectionInstance,
    collection,
    collectionId,
    collectionName,
    collectionOwner,
    totalItems,
    avgPrice,
    totalWorth,
    NFTsPricesAndIds,
    isLoading,
    tokenURIs,
  };
};

export default useCollectionNFTs;
