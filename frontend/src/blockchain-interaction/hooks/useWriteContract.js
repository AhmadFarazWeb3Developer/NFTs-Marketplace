import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useConstants from "./useConstants";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

const useWriteContract = () => {
  const { contractAddress, contractABI } = useConstants();

  const [factoryWriteInstance, setFactoryWriteInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the correct chain namespace (eip155 for EVM chains)
  const { walletProvider } = useAppKitProvider("eip155");
  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    if (!isConnected || !walletProvider) {
      console.log("Wallet not connected or provider unavailable");
      setFactoryWriteInstance(null);
      return;
    }

    const initContract = async () => {
      setIsLoading(true);
      try {
        const provider = new ethers.BrowserProvider(walletProvider);
        const signer = await provider.getSigner();

        // Verify signer address matches connected address
        const signerAddress = await signer.getAddress();
        console.log("Signer address:", signerAddress);

        if (signerAddress.toLowerCase() !== address.toLowerCase()) {
          throw new Error("Signer address doesn't match connected address");
        }

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Contract instance created successfully");
        setFactoryWriteInstance(contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
        setFactoryWriteInstance(null);
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, [isConnected, walletProvider, address, contractAddress, contractABI]);

  return { factoryWriteInstance, isLoading };
};

export default useWriteContract;
