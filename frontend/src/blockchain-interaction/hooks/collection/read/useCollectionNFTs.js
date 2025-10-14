import { useEffect, useState } from "react";
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
  const [volume, setVolume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [NFTsPricesAndIds, setNFTsPricesAndIds] = useState([]);
  const [tokenURIs, setTokenURIs] = useState([]);

  const calculateAvgPrice = async (instance) => {
    let totalPrice = 0n;
    const supply = Number(await instance.tokenId());
    for (let tokenId = 0; tokenId < supply; tokenId++) {
      const price = await instance.tokenPrice(tokenId);
      totalPrice += price;
    }

    if (supply === 0) return "0";
    const avgPrice = totalPrice / BigInt(supply);
    return formatEther(avgPrice);
  };

  const fetchNFTs = async () => {
    setIsLoading(true);

    try {
      const collectionId = Number(
        await factoryReadInstance.collectionAddressToId(collection)
      );

      const instance = await getNFTCollectionInstance(collection);

      const name = await instance.name();
      const id = Number(await instance.tokenId());
      const avgPrice = await calculateAvgPrice(instance);

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const collectionBalance = await provider.getBalance(collection);

      const tempData = [];
      const tempURIs = [];
      for (let tokenId = 0; tokenId < id; tokenId++) {
        const tokenPrice = formatEther(await instance.tokenPrice(tokenId));
        const tokenURI = await instance.tokenURI(tokenId);
        tempData.push({ tokenId, tokenPrice });
        tempURIs.push(tokenURI);
      }

      setCollectionInstance(instance);
      setCollectionName(name);
      setCollectionId(collectionId);
      setTotalItems(id);
      setAvgPrice(avgPrice);
      setVolume(formatEther(collectionBalance));
      setNFTsPricesAndIds(tempData);
      setTokenURIs(tempURIs);
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
    totalItems,
    avgPrice,
    volume,
    NFTsPricesAndIds,
    isLoading,
    tokenURIs,
  };
};

export default useCollectionNFTs;
