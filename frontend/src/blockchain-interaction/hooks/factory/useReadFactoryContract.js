import { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import useConstants from "../../helpers/useConstants";
import useReadFactoryInstanceStore from "../../stores/useReadFactoryInstanceStore.store";
import {
  arbitrum_sepolia_chain_provider,
  avalanche_fuji,
  bnb_smart_chain_provider,
  optimism_sepolia,
} from "../../helpers/providers";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const { setFactoryReadInstance } = useReadFactoryInstanceStore();

  const [factoryBalance, setFactoryBalance] = useState("0.00");

  useEffect(() => {
    const init = async () => {
      if (!factoryAddress || !factoryABI) return;

      const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        optimism_sepolia
      );

      const balance = await optimism_sepolia.getBalance(factoryAddress);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);

      setFactoryReadInstance(contract);
      setFactoryBalance(balanceInEth);
    };

    init();
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);

  return { factoryBalance };
};

export default useReadFactoryContract;
