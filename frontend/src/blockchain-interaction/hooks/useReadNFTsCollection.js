import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import NFTsCollectionArtifact from "../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import { useAppKitProvider } from "@reown/appkit/react";

const useReadNFTsCollection = (collectionAddress) => {
  const { walletProvider } = useAppKitProvider("eip155");
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  const getNFTsCollection = useCallback(async () => {
    try {
      if (!walletProvider || !collectionAddress) return;

      const provider = new ethers.BrowserProvider(walletProvider);

      const instance = new ethers.Contract(
        collectionAddress,
        NFTsCollectionArtifact.abi,
        provider
      );

      setContract(instance);
      setError(null);
    } catch (err) {
      console.error("Failed to init collection contract:", err);
      setError(err);
    }
  }, [walletProvider, collectionAddress]);

  useEffect(() => {
    getNFTsCollection();
  }, [getNFTsCollection]);

  return { contract, error, getNFTsCollection };
};

export default useReadNFTsCollection;
