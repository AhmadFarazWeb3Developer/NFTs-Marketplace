// // // // import { useState } from "react";
// // // // import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
// // // // import useConstants from "./useConstants";

// // // // const useCreateCollection = () => {
// // // //   const { contractAddress, contractABI } = useConstants();
// // // //   const { address } = useAppKitAccount(); // connected wallet
// // // //   const { sendTransaction } = useAppKit(); // AppKit function to send tx

// // // //   const [isPending, setIsPending] = useState(false);
// // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [txHash, setTxHash] = useState(null);

// // // //   const createCollectionOnChain = async (name, symbol) => {
// // // //     if (!address) {
// // // //       setError(new Error("Wallet not connected"));
// // // //       return;
// // // //     }

// // // //     setIsPending(true);
// // // //     setIsSuccess(false);
// // // //     setError(null);
// // // //     setTxHash(null);

// // // //     try {
// // // //       const tx = await sendTransaction({
// // // //         to: contractAddress,
// // // //         abi: contractABI,
// // // //         functionName: "createCollection",
// // // //         args: [name, symbol],
// // // //         // optional: gas limit or value if needed
// // // //       });

// // // //       setTxHash(tx);
// // // //       setIsPending(false);
// // // //       setIsSuccess(true);
// // // //     } catch (err) {
// // // //       console.error("Error creating collection:", err);
// // // //       setError(err);
// // // //       setIsPending(false);
// // // //     }
// // // //   };

// // // //   return {
// // // //     createCollectionOnChain,
// // // //     txHash,
// // // //     isPending,
// // // //     isSuccess,
// // // //     isError: !!error,
// // // //     error,
// // // //   };
// // // // };

// // // // export default useCreateCollection;
// // // import { useState } from "react";
// // // import { useAppKit } from "@reown/appkit/react";
// // // import useConstants from "./useConstants.js";

// // // const useCreateCollection = () => {
// // //   const { contractAddress, contractABI } = useConstants();
// // //   const { walletClient } = useAppKit(); // Get connected wallet

// // //   const [isPending, setIsPending] = useState(false);
// // //   const [isSuccess, setIsSuccess] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [txHash, setTxHash] = useState(null);

// // //   const createCollectionOnChain = async (name, symbol) => {
// // //     if (!walletClient) {
// // //       setError(new Error("Wallet not connected"));
// // //       return;
// // //     }

// // //     setIsPending(true);
// // //     setIsSuccess(false);
// // //     setError(null);
// // //     setTxHash(null);

// // //     try {
// // //       const hash = await walletClient.writeContract({
// // //         address: contractAddress,
// // //         abi: contractABI,
// // //         functionName: "createCollection",
// // //         args: [name, symbol],
// // //       });

// // //       setTxHash(hash);
// // //       setIsPending(false);
// // //       setIsSuccess(true);
// // //     } catch (err) {
// // //       console.error("Error creating collection:", err);
// // //       setError(err);
// // //       setIsPending(false);
// // //     }
// // //   };

// // //   return {
// // //     createCollectionOnChain,
// // //     txHash,
// // //     isPending,
// // //     isSuccess,
// // //     isError: !!error,
// // //     error,
// // //   };
// // // };

// // // export default useCreateCollection;

// // import { useState } from "react";
// // import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
// // import useConstants from "./useConstants.js";

// // const useCreateCollection = () => {
// //   const { contractAddress, contractABI } = useConstants();
// //   const { walletClient } = useAppKit();
// //   const { address } = useAppKitAccount(); // detect connected wallet

// //   const [isPending, setIsPending] = useState(false);
// //   const [isSuccess, setIsSuccess] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [txHash, setTxHash] = useState(null);

// //   const createCollectionOnChain = async (name, symbol) => {
// //     if (!address) {
// //       // <-- use 'address' to check
// //       setError(new Error("Wallet not connected"));
// //       return;
// //     }

// //     setIsPending(true);
// //     setIsSuccess(false);
// //     setError(null);
// //     setTxHash(null);

// //     try {
// //       const hash = await walletClient.writeContract({
// //         address: contractAddress,
// //         abi: contractABI,
// //         functionName: "createCollection",
// //         args: [name, symbol],
// //       });

// //       setTxHash(hash);
// //       setIsPending(false);
// //       setIsSuccess(true);
// //     } catch (err) {
// //       console.error("Error creating collection:", err);
// //       setError(err);
// //       setIsPending(false);
// //     }
// //   };

// //   return {
// //     createCollectionOnChain,
// //     txHash,
// //     isPending,
// //     isSuccess,
// //     isError: !!error,
// //     error,
// //   };
// // };

// // export default useCreateCollection;

// import { useState } from "react";
// import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
// import useConstants from "./useConstants.js";

// const useCreateCollection = () => {
//   const { contractAddress, contractABI } = useConstants();
//   const { walletClient } = useAppKit();
//   const { address } = useAppKitAccount(); // connected wallet

//   const [isPending, setIsPending] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [txHash, setTxHash] = useState(null);

//   const createCollectionOnChain = async (name, symbol) => {
//     if (!address) {
//       setError(new Error("Wallet not connected"));
//       return;
//     }

//     if (!walletClient || !walletClient.writeContract) {
//       setError(new Error("Wallet client not ready yet"));
//       return;
//     }

//     setIsPending(true);
//     setIsSuccess(false);
//     setError(null);
//     setTxHash(null);

//     try {
//       const hash = await walletClient.writeContract({
//         address: contractAddress,
//         abi: contractABI,
//         functionName: "createCollection",
//         args: [name, symbol],
//       });

//       setTxHash(hash);
//       setIsPending(false);
//       setIsSuccess(true);
//     } catch (err) {
//       console.error("Error creating collection:", err);
//       setError(err);
//       setIsPending(false);
//     }
//   };

//   return {
//     createCollectionOnChain,
//     txHash,
//     isPending,
//     isSuccess,
//     isError: !!error,
//     error,
//   };
// };

// export default useCreateCollection;

import { useState, useEffect } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import useConstants from "./useConstants.js";

const useCreateCollection = () => {
  const { contractAddress, contractABI } = useConstants();
  const { walletClient } = useAppKit();
  const { address } = useAppKitAccount();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  // Optional: track whether client is ready
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (walletClient) setClientReady(true);
  }, [walletClient]);

  const createCollectionOnChain = async (name, symbol) => {
    if (!address) {
      setError(new Error("Wallet not connected"));
      return;
    }

    if (!clientReady) {
      setError(new Error("Wallet client not ready yet. Please wait."));
      return;
    }

    setIsPending(true);
    setIsSuccess(false);
    setError(null);
    setTxHash(null);

    try {
      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createCollection",
        args: [name, symbol],
      });

      setTxHash(hash);
      setIsPending(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error creating collection:", err);
      setError(err);
      setIsPending(false);
    }
  };

  return {
    createCollectionOnChain,
    txHash,
    isPending,
    isSuccess,
    isError: !!error,
    error,
    clientReady,
  };
};

export default useCreateCollection;
