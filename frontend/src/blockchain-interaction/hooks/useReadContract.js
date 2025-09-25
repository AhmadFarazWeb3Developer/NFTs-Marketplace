import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useConstants from "./useConstants";

const useReadContract = () => {
  const { contractAddress, factoryABI } = useConstants();
  const [factoryReadInstance, setFactoryReadInstance] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      let _provider;

      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        _provider = ethers.getDefaultProvider();
      } else {
        // local RPC
        _provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      }

      const contract = new ethers.Contract(
        contractAddress,
        factoryABI,
        _provider
      );

      setProvider(_provider);
      setFactoryReadInstance(contract);
    };

    init();
  }, [contractAddress, factoryABI]);

  return { provider, factoryReadInstance };
};

export default useReadContract;
