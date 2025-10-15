// import { useEffect } from "react";
// import { ethers } from "ethers";
// import useConstants from "../../helpers/useConstants";
// import useReadFactoryInstanceStore from "../../stores/useReadFactoryInstanceStore.store";

// const useReadFactoryContract = () => {
//   const { factoryAddress, factoryABI } = useConstants();
//   const { setFactoryReadInstance } = useReadFactoryInstanceStore();

//   useEffect(() => {
//     const init = async () => {
//       if (!factoryAddress || !factoryABI) return;

//       const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//       const contract = new ethers.Contract(
//         factoryAddress,
//         factoryABI,
//         provider
//       );

//       const balance = await provider.getBalance(factoryAddress);
//       console.log("factory balance ", balance);

//       setFactoryReadInstance(contract);
//     };

//     init();
//   }, [factoryAddress, factoryABI, setFactoryReadInstance]);
// };

// export default useReadFactoryContract;

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

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        provider
      );

      // Get balance and format to ETH with 2 decimals
      const balance = await provider.getBalance(factoryAddress);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);

      console.log("Factory balance (ETH):", balanceInEth);

      setFactoryReadInstance(contract);
      setFactoryBalance(balanceInEth);
    };

    init();
  }, [factoryAddress, factoryABI, setFactoryReadInstance]);

  // Return both contract instance and formatted balance
  return { factoryBalance };
};

export default useReadFactoryContract;
