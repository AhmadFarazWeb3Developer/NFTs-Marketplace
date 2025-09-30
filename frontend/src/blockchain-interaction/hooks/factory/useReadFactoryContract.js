import { useEffect } from "react";
import { ethers } from "ethers";
import useConstants from "../../helpers/useConstants";
import useReadFactoryInstance from "../../stores/useReadFactoryInstanceStore.store";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const { setFactoryReadInstance } = useReadFactoryInstance();

  useEffect(() => {
    if (!factoryAddress || !factoryABI) return;

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = new ethers.Contract(factoryAddress, factoryABI, provider);

    setFactoryReadInstance(contract);
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);
};

export default useReadFactoryContract;
