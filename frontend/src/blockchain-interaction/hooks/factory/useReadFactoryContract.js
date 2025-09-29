import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useConstants from "../../helpers/useConstants";
import useAuthenticate from "../../helpers/Auth";

const useReadFactoryContract = () => {
  const { factoryAddress, factoryABI } = useConstants();
  const [factoryReadInstance, setFactoryReadInstance] = useState(null);

  const { signer } = useAuthenticate();
  useEffect(() => {
    const init = async () => {
      const contract = new ethers.Contract(factoryAddress, factoryABI, signer);

      setFactoryReadInstance(contract);
    };

    init();
  }, [factoryAddress, factoryABI, signer]);

  return { signer, factoryReadInstance };
};

export default useReadFactoryContract;
