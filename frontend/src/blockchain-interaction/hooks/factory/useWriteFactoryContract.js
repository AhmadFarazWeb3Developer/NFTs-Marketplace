import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useConstants from "../../helpers/useConstants";
import Authenticate from "../../helpers/Auth";

const useWriteFactoryContract = () => {
  const { contractAddress, factoryABI } = useConstants();

  const [factoryWriteInstance, setFactoryWriteInstance] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { error, signer } = Authenticate();

  useEffect(() => {
    const initContract = async () => {
      setIsLoading(true);
      try {
        if (error) {
          console.log(error);
          return;
        }

        const contract = new ethers.Contract(
          contractAddress,
          factoryABI,
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
  }, [isConnected, walletProvider, address, contractAddress, factoryABI]);

  return { factoryWriteInstance, isLoading };
};

export default useWriteFactoryContract;
