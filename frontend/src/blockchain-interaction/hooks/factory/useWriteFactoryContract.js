import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useConstants from "../../helpers/useConstants";
import useAuthenticate from "../../helpers/Auth";

const useWriteFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const [factoryWriteInstance, setFactoryWriteInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { error, signer } = useAuthenticate();

  useEffect(() => {
    const initContract = async () => {
      if (!signer) {
        setFactoryWriteInstance(null);
        return;
      }

      setIsLoading(true);
      try {
        if (error) {
          console.log(error);
          return;
        }

        const contract = new ethers.Contract(
          factoryAddress,
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
  }, [signer]);

  return { factoryWriteInstance, isLoading, signer };
};

export default useWriteFactoryContract;
