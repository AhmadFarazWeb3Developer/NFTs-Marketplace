import { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import useConstants from "../../helpers/useConstants";
import useReadFactoryInstanceStore from "../../stores/useReadFactoryInstanceStore.store";
import { bnb_smart_chain_provider } from "../../helpers/providers";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const { setFactoryReadInstance } = useReadFactoryInstanceStore();

  const [factoryBalance, setFactoryBalance] = useState("0.00");

  useEffect(() => {
    const init = async () => {
      if (!factoryAddress || !factoryABI) return;

      console.log("bnb provider : ", bnb_smart_chain_provider);

      const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        bnb_smart_chain_provider
      );

      const balance = await bnb_smart_chain_provider.getBalance(factoryAddress);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);

      setFactoryReadInstance(contract);
      setFactoryBalance(balanceInEth);
    };

    init();
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);

  return { factoryBalance };
};

export default useReadFactoryContract;
