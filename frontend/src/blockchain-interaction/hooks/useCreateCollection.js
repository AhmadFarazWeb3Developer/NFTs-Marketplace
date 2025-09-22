// // export default useCreateCollection;

// import { useState, useEffect } from "react";
// import { useWalletClient } from "wagmi";
// import { ethers } from "ethers";
// import useConstants from "./useConstants";

// const useCreateCollection = () => {
//   const { contractAddress, contractABI } = useConstants();
//   const { data: walletClient } = useWalletClient();

//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [txHash, setTxHash] = useState(null);
//   const [signer, setSigner] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const initializeSigner = async () => {
//       if (!walletClient) {
//         if (isMounted) setSigner(null);
//         return;
//       }

//       try {
//         const provider = new ethers.BrowserProvider(walletClient);
//         const newSigner = await provider.getSigner();
//         if (isMounted) setSigner(newSigner);
//       } catch (err) {
//         console.error("Error initializing signer:", err);
//         if (isMounted) setError(err);
//       }
//     };

//     initializeSigner();

//     return () => {
//       isMounted = false;
//     };
//   }, [walletClient]);

//   const createCollectionOnChain = async (name, symbol) => {
//     if (!signer) {
//       setError(new Error("Wallet not connected or signer not initialized"));
//       setIsPending(false);
//       return;
//     }

//     setError(null);
//     setIsPending(true);
//     setIsConfirming(false);
//     setIsSuccess(false);
//     setTxHash(null);

//     try {
//       console.log("Creating collection with:", {
//         name,
//         symbol,
//         contractAddress,
//       });
//       const iface = new ethers.Interface(contractABI);
//       const data = iface.encodeFunctionData("createCollection", [name, symbol]);
//       console.log("Encoded data:", data); // Debug to confirm encoding

//       const tx = await signer.sendTransaction({
//         to: contractAddress,
//         data: data,
//         gasLimit: 300000, // Increase to avoid gas issues
//       });
//       setTxHash(tx.hash);

//       setIsPending(false);
//       setIsConfirming(true);

//       const receipt = await tx.wait();
//       console.log("Transaction receipt:", receipt);

//       setIsConfirming(false);
//       setIsSuccess(true);
//     } catch (err) {
//       console.error("Error creating collection:", err);
//       setError(err);
//       setIsPending(false);
//       setIsConfirming(false);
//     }
//   };

//   return {
//     createCollectionOnChain,
//     txHash,
//     isPending,
//     isConfirming,
//     isSuccess,
//     isError: !!error,
//     error,
//   };
// };

// export default useCreateCollection;
