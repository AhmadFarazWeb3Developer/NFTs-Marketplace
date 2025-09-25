import { useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";

const useReadNFTsCollection = () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const getNFTsCollection = async (collectionAddress) => {
    if (!walletProvider || !collectionAddress) {
      throw new Error("Missing wallet provider or collection address");
    }

    const provider = new ethers.BrowserProvider(walletProvider);

    const instance = new ethers.Contract(
      collectionAddress,
      NFTsCollectionABI.abi,
      provider
    );

    return instance;
  };

  return { getNFTsCollection };
};

export default useReadNFTsCollection;
