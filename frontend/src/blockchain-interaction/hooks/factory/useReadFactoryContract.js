import { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import useConstants from "../../helpers/useConstants";
import useReadFactoryInstanceStore from "../../stores/useReadFactoryInstanceStore.store";
import { getProviderByChainId } from "../../helpers/getProviderByChainId";
import { useAppKitNetwork } from "@reown/appkit/react";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const { setFactoryReadInstance } = useReadFactoryInstanceStore();

  const { chainId } = useAppKitNetwork();
  const [factoryBalance, setFactoryBalance] = useState("0.00");

  useEffect(() => {
    const init = async () => {
      if (!factoryAddress || !factoryABI) return;

      const provider = getProviderByChainId(chainId);

      const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        provider
      );

      const balance = await provider.getBalance(factoryAddress);

      console.log("balance : ", balance);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);

      setFactoryReadInstance(contract);
      setFactoryBalance(balanceInEth);
    };

    init();
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);

  return { factoryBalance };
};

export default useReadFactoryContract;
