import { useMemo } from "react";
import { ethers } from "ethers";
import useConstants from "../../helpers/useConstants";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();

  // useMemo so it doesn’t recreate on every render
  const provider = useMemo(() => {
    return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }, []);

  const factoryReadInstance = useMemo(() => {
    if (!factoryAddress || !factoryABI || !provider) return null;
    return new ethers.Contract(factoryAddress, factoryABI, provider);
  }, [factoryAddress, factoryABI, provider]);

  return { factoryReadInstance };
};

export default useReadFactoryContract;
