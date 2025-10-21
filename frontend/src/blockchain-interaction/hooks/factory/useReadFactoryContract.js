import { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import useConstants from "../../helpers/useConstants";
import useReadFactoryInstanceStore from "../../stores/useReadFactoryInstanceStore.store";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const { setFactoryReadInstance } = useReadFactoryInstanceStore();

  const [factoryBalance, setFactoryBalance] = useState("0.00"); // local state

  useEffect(() => {
    const init = async () => {
      if (!factoryAddress || !factoryABI) return;

      // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const provider = new ethers.JsonRpcProvider(
        "https://rpc-amoy.polygon.technology"
      );
      const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        provider
      );

      const balance = await provider.getBalance(factoryAddress);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);

      setFactoryReadInstance(contract);
      setFactoryBalance(balanceInEth);
    };

    init();
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);

  return { factoryBalance };
};

export default useReadFactoryContract;
