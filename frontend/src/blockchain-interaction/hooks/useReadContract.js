import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useConstants from "./useConstants";

const useReadContract = () => {
  const { contractAddress, contractABI } = useConstants();
  const [factoryInstance, setFactoryInstance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const init = async () => {
      let _provider;
      let _signer;

      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        _provider = ethers.getDefaultProvider();
      } else {
        // local RPC
        _provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        _signer = await _provider.getSigner(0); // explicitly pick first account
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        _signer
      );

      setProvider(_provider);
      setSigner(_signer);
      setFactoryInstance(contract);
    };

    init();
  }, [contractAddress, contractABI]);

  return { provider, signer, factoryInstance };
};

export default useReadContract;
