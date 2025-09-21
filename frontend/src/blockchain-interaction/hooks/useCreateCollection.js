// // // // // // // // // import { useState } from "react";
// // // // // // // // // import useConstants from "./useConstants";
// // // // // // // // // import useFactoryContract from "../helpers/useFactoryContract";

// // // // // // // // // const useCreateCollection = () => {
// // // // // // // // //   const { contractAddress, contractABI } = useConstants();

// // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // //   const [isPending, setIsPending] = useState(false); // same naming as before
// // // // // // // // //   const [isConfirming, setIsConfirming] = useState(false);
// // // // // // // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // // // // // // //   const [txHash, setTxHash] = useState(null);

// // // // // // // // //   const createCollectionOnChain = async (name, symbol) => {
// // // // // // // // //     const contract = useFactoryContract();

// // // // // // // // //     setError(null);
// // // // // // // // //     setIsPending(true);
// // // // // // // // //     setIsConfirming(false);
// // // // // // // // //     setIsSuccess(false);
// // // // // // // // //     setTxHash(null);

// // // // // // // // //     try {
// // // // // // // // //       // send tx
// // // // // // // // //       const tx = await contract.createCollection(name, symbol);
// // // // // // // // //       setTxHash(tx.hash);

// // // // // // // // //       setIsPending(false);
// // // // // // // // //       setIsConfirming(true);

// // // // // // // // //       // wait for mining
// // // // // // // // //       await tx.wait();

// // // // // // // // //       setIsConfirming(false);
// // // // // // // // //       setIsSuccess(true);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Error creating collection:", err);
// // // // // // // // //       setError(err);
// // // // // // // // //       setIsPending(false);
// // // // // // // // //       setIsConfirming(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return {
// // // // // // // // //     createCollectionOnChain, // matches your old naming
// // // // // // // // //     txHash,
// // // // // // // // //     isPending,
// // // // // // // // //     isConfirming,
// // // // // // // // //     isSuccess,
// // // // // // // // //     isError: !!error,
// // // // // // // // //     error,
// // // // // // // // //   };
// // // // // // // // // };

// // // // // // // // // export default useCreateCollection;

// // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // import { useWalletClient, useAccount } from "wagmi";
// // // // // // // // import { ethers } from "ethers";
// // // // // // // // import useConstants from "./useConstants";

// // // // // // // // const useCreateCollection = () => {
// // // // // // // //   const { contractAddress, contractABI } = useConstants();
// // // // // // // //   const { data: walletClient } = useWalletClient();
// // // // // // // //   const { address } = useAccount();

// // // // // // // //   const [error, setError] = useState(null);
// // // // // // // //   const [isPending, setIsPending] = useState(false);
// // // // // // // //   const [isConfirming, setIsConfirming] = useState(false);
// // // // // // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // // // // // //   const [txHash, setTxHash] = useState(null);

// // // // // // // //   const contract = walletClient
// // // // // // // //     ? new ethers.BrowserProvider(walletClient.transport, "any")
// // // // // // // //         .getSigner()
// // // // // // // //         .then(
// // // // // // // //           (signer) => new ethers.Contract(contractAddress, contractABI, signer)
// // // // // // // //         )
// // // // // // // //     : null;

// // // // // // // //   const createCollectionOnChain = async (name, symbol) => {
// // // // // // // //     if (!contract) {
// // // // // // // //       setError(new Error("Wallet not connected"));
// // // // // // // //       setIsPending(false);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setError(null);
// // // // // // // //     setIsPending(true);
// // // // // // // //     setIsConfirming(false);
// // // // // // // //     setIsSuccess(false);
// // // // // // // //     setTxHash(null);

// // // // // // // //     try {
// // // // // // // //       console.log("Calling createCollection with:", {
// // // // // // // //         name,
// // // // // // // //         symbol,
// // // // // // // //         contractAddress,
// // // // // // // //       });
// // // // // // // //       const tx = await (
// // // // // // // //         await contract
// // // // // // // //       ).createCollection(name, symbol, {
// // // // // // // //         gasLimit: 200000,
// // // // // // // //         // Uncomment and adjust if payable: value: parseEther("0.01"),
// // // // // // // //       });
// // // // // // // //       setTxHash(tx.hash);

// // // // // // // //       setIsPending(false);
// // // // // // // //       setIsConfirming(true);

// // // // // // // //       await tx.wait();

// // // // // // // //       setIsConfirming(false);
// // // // // // // //       setIsSuccess(true);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error creating collection:", err);
// // // // // // // //       setError(err);
// // // // // // // //       setIsPending(false);
// // // // // // // //       setIsConfirming(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return {
// // // // // // // //     createCollectionOnChain,
// // // // // // // //     txHash,
// // // // // // // //     isPending,
// // // // // // // //     isConfirming,
// // // // // // // //     isSuccess,
// // // // // // // //     isError: !!error,
// // // // // // // //     error,
// // // // // // // //   };
// // // // // // // // };

// // // // // // // // export default useCreateCollection;

// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { useWalletClient } from "wagmi";
// // // // // // // import { ethers } from "ethers";
// // // // // // // import useConstants from "./useConstants";

// // // // // // // const useCreateCollection = () => {
// // // // // // //   const { contractAddress, contractABI } = useConstants();
// // // // // // //   const { data: walletClient } = useWalletClient();

// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [isPending, setIsPending] = useState(false);
// // // // // // //   const [isConfirming, setIsConfirming] = useState(false);
// // // // // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // // // // //   const [txHash, setTxHash] = useState(null);
// // // // // // //   const [contract, setContract] = useState(null);

// // // // // // //   // Initialize contract when walletClient changes
// // // // // // //   useEffect(() => {
// // // // // // //     let isMounted = true;

// // // // // // //     const initializeContract = async () => {
// // // // // // //       if (!walletClient) {
// // // // // // //         if (isMounted) setContract(null);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       try {
// // // // // // //         const provider = new ethers.BrowserProvider(
// // // // // // //           walletClient.transport,
// // // // // // //           "any"
// // // // // // //         );
// // // // // // //         const signer = await provider.getSigner();
// // // // // // //         const newContract = new ethers.Contract(
// // // // // // //           contractAddress,
// // // // // // //           contractABI,
// // // // // // //           signer
// // // // // // //         );
// // // // // // //         if (isMounted) setContract(newContract);
// // // // // // //       } catch (err) {
// // // // // // //         console.error("Error initializing contract:", err);
// // // // // // //         if (isMounted) setError(err);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     initializeContract();

// // // // // // //     return () => {
// // // // // // //       isMounted = false;
// // // // // // //     };
// // // // // // //   }, [walletClient, contractAddress, contractABI]);

// // // // // // //   const createCollectionOnChain = async (name, symbol) => {
// // // // // // //     if (!contract) {
// // // // // // //       setError(new Error("Wallet not connected or contract not initialized"));
// // // // // // //       setIsPending(false);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setError(null);
// // // // // // //     setIsPending(true);
// // // // // // //     setIsConfirming(false);
// // // // // // //     setIsSuccess(false);
// // // // // // //     setTxHash(null);

// // // // // // //     try {
// // // // // // //       console.log("Calling createCollection with:", {
// // // // // // //         name,
// // // // // // //         symbol,
// // // // // // //         contractAddress,
// // // // // // //       });
// // // // // // //       const tx = await contract.createCollection(name, symbol, {
// // // // // // //         gasLimit: 200000, // Explicit gas limit
// // // // // // //         // Uncomment and adjust if payable: value: ethers.parseEther("0.01"),
// // // // // // //       });
// // // // // // //       setTxHash(tx.hash);

// // // // // // //       setIsPending(false);
// // // // // // //       setIsConfirming(true);

// // // // // // //       await tx.wait();

// // // // // // //       setIsConfirming(false);
// // // // // // //       setIsSuccess(true);
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error creating collection:", err);
// // // // // // //       setError(err);
// // // // // // //       setIsPending(false);
// // // // // // //       setIsConfirming(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return {
// // // // // // //     createCollectionOnChain,
// // // // // // //     txHash,
// // // // // // //     isPending,
// // // // // // //     isConfirming,
// // // // // // //     isSuccess,
// // // // // // //     isError: !!error,
// // // // // // //     error,
// // // // // // //   };
// // // // // // // };

// // // // // // // export default useCreateCollection;

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useWalletClient } from "wagmi";
// // // // // // import { ethers } from "ethers";
// // // // // // import useConstants from "./useConstants";

// // // // // // const useCreateCollection = () => {
// // // // // //   const { contractAddress, contractABI } = useConstants();
// // // // // //   const { data: walletClient } = useWalletClient();

// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [isPending, setIsPending] = useState(false);
// // // // // //   the[(isConfirming, setIsConfirming)] = useState(false);
// // // // // //   the[(isSuccess, setIsSuccess)] = useState(false);
// // // // // //   the[(txHash, setTxHash)] = useState(null);
// // // // // //   the[(signer, setSigner)] = useState(null);

// // // // // //   // Initialize signer
// // // // // //   useEffect(() => {
// // // // // //     let isMounted = true;

// // // // // //     const initializeSigner = async () => {
// // // // // //       if (!walletClient) {
// // // // // //         if (isMounted) setSigner(null);
// // // // // //         return;
// // // // // //       }

// // // // // //       try {
// // // // // //         const provider = new ethers.BrowserProvider(
// // // // // //           walletClient.transport,
// // // // // //           "any"
// // // // // //         );
// // // // // //         const newSigner = await provider.getSigner();
// // // // // //         if (isMounted) setSigner(newSigner);
// // // // // //       } catch (err) {
// // // // // //         console.error("Error initializing signer:", err);
// // // // // //         if (isMounted) setError(err);
// // // // // //       }
// // // // // //     };

// // // // // //     initializeSigner();

// // // // // //     return () => {
// // // // // //       isMounted = false;
// // // // // //     };
// // // // // //   }, [walletClient]);

// // // // // //   const createCollectionOnChain = async (name, symbol) => {
// // // // // //     if (!signer) {
// // // // // //       setError(new Error("Wallet not connected or signer not initialized"));
// // // // // //       setIsPending(false);
// // // // // //       return;
// // // // // //     }

// // // // // //     setError(null);
// // // // // //     setIsPending(true);
// // // // // //     setIsConfirming(false);
// // // // // //     setIsSuccess(false);
// // // // // //     setTxHash(null);

// // // // // //     try {
// // // // // //       console.log("Creating collection with:", {
// // // // // //         name,
// // // // // //         symbol,
// // // // // //         contractAddress,
// // // // // //       });
// // // // // //       // Manually encode the function data
// // // // // //       const iface = new ethers.Interface(contractABI);
// // // // // //       const data = iface.encodeFunctionData("createCollection", [name, symbol]);

// // // // // //       const tx = await signer.sendTransaction({
// // // // // //         to: contractAddress,
// // // // // //         data: data, // Encoded function data
// // // // // //         gasLimit: 200000, // Explicit gas limit
// // // // // //         // Uncomment and adjust if payable: value: ethers.parseEther("0.01"),
// // // // // //       });
// // // // // //       setTxHash(tx.hash);

// // // // // //       setIsPending(false);
// // // // // //       setIsConfirming(true);

// // // // // //       await tx.wait();

// // // // // //       setIsConfirming(false);
// // // // // //       setIsSuccess(true);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error creating collection:", err);
// // // // // //       setError(err);
// // // // // //       setIsPending(false);
// // // // // //       setIsConfirming(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return {
// // // // // //     createCollectionOnChain,
// // // // // //     txHash,
// // // // // //     isPending,
// // // // // //     isConfirming,
// // // // // //     isSuccess,
// // // // // //     isError: !!error,
// // // // // //     error,
// // // // // //   };
// // // // // // };

// // // // // // export default useCreateCollection;

// // // // // import { useState, useEffect } from "react";
// // // // // import { useWalletClient } from "wagmi";
// // // // // import { ethers } from "ethers";
// // // // // import useConstants from "./useConstants";

// // // // // const useCreateCollection = () => {
// // // // //   const { contractAddress, contractABI } = useConstants();
// // // // //   const { data: walletClient } = useWalletClient();

// // // // //   const [error, setError] = useState(null);
// // // // //   const [isPending, setIsPending] = useState(false);
// // // // //   const [isConfirming, setIsConfirming] = useState(false);
// // // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // // //   const [txHash, setTxHash] = useState(null);
// // // // //   const [signer, setSigner] = useState(null);

// // // // //   // Initialize signer
// // // // //   useEffect(() => {
// // // // //     let isMounted = true;

// // // // //     const initializeSigner = async () => {
// // // // //       if (!walletClient) {
// // // // //         if (isMounted) setSigner(null);
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         const provider = new ethers.BrowserProvider(
// // // // //           walletClient.transport,
// // // // //           "any"
// // // // //         );
// // // // //         const newSigner = await provider.getSigner();
// // // // //         if (isMounted) setSigner(newSigner);
// // // // //       } catch (err) {
// // // // //         console.error("Error initializing signer:", err);
// // // // //         if (isMounted) setError(err);
// // // // //       }
// // // // //     };

// // // // //     initializeSigner();

// // // // //     return () => {
// // // // //       isMounted = false;
// // // // //     };
// // // // //   }, [walletClient]);

// // // // //   const createCollectionOnChain = async (name, symbol) => {
// // // // //     if (!signer) {
// // // // //       setError(new Error("Wallet not connected or signer not initialized"));
// // // // //       setIsPending(false);
// // // // //       return;
// // // // //     }

// // // // //     setError(null);
// // // // //     setIsPending(true);
// // // // //     setIsConfirming(false);
// // // // //     setIsSuccess(false);
// // // // //     setTxHash(null);

// // // // //     try {
// // // // //       console.log("Creating collection with:", {
// // // // //         name,
// // // // //         symbol,
// // // // //         contractAddress,
// // // // //       });
// // // // //       // Manually encode the function data
// // // // //       const iface = new ethers.Interface(contractABI);
// // // // //       const data = iface.encodeFunctionData("createCollection", [name, symbol]);

// // // // //       const tx = await signer.sendTransaction({
// // // // //         to: contractAddress,
// // // // //         data: data, // Encoded function data
// // // // //         gasLimit: 200000, // Explicit gas limit
// // // // //         // Uncomment and adjust if payable: value: ethers.parseEther("0.01"),
// // // // //       });
// // // // //       setTxHash(tx.hash);

// // // // //       setIsPending(false);
// // // // //       setIsConfirming(true);

// // // // //       await tx.wait();

// // // // //       setIsConfirming(false);
// // // // //       setIsSuccess(true);
// // // // //     } catch (err) {
// // // // //       console.error("Error creating collection:", err);
// // // // //       setError(err);
// // // // //       setIsPending(false);
// // // // //       setIsConfirming(false);
// // // // //     }
// // // // //   };

// // // // //   return {
// // // // //     createCollectionOnChain,
// // // // //     txHash,
// // // // //     isPending,
// // // // //     isConfirming,
// // // // //     isSuccess,
// // // // //     isError: !!error,
// // // // //     error,
// // // // //   };
// // // // // };

// // // // // export default useCreateCollection;

// // // // import { useState, useEffect } from "react";
// // // // import { useWalletClient } from "wagmi";
// // // // import { ethers } from "ethers";
// // // // import useConstants from "./useConstants";

// // // // const useCreateCollection = () => {
// // // //   const { contractAddress, contractABI } = useConstants();
// // // //   const { data: walletClient } = useWalletClient();

// // // //   const [error, setError] = useState(null);
// // // //   const [isPending, setIsPending] = useState(false);
// // // //   const [isConfirming, setIsConfirming] = useState(false);
// // // //   const [isSuccess, setIsSuccess] = useState(false);
// // // //   const [txHash, setTxHash] = useState(null);
// // // //   const [signer, setSigner] = useState(null);

// // // //   useEffect(() => {
// // // //     let isMounted = true;

// // // //     const initializeSigner = async () => {
// // // //       if (!walletClient) {
// // // //         if (isMounted) setSigner(null);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const provider = new ethers.BrowserProvider(
// // // //           walletClient.transport,
// // // //           "any"
// // // //         );
// // // //         const newSigner = await provider.getSigner();
// // // //         if (isMounted) setSigner(newSigner);
// // // //       } catch (err) {
// // // //         console.error("Error initializing signer:", err);
// // // //         if (isMounted) setError(err);
// // // //       }
// // // //     };

// // // //     initializeSigner();

// // // //     return () => {
// // // //       isMounted = false;
// // // //     };
// // // //   }, [walletClient]);

// // // //   const createCollectionOnChain = async (name, symbol) => {
// // // //     if (!signer) {
// // // //       setError(new Error("Wallet not connected or signer not initialized"));
// // // //       setIsPending(false);
// // // //       return;
// // // //     }

// // // //     setError(null);
// // // //     setIsPending(true);
// // // //     setIsConfirming(false);
// // // //     setIsSuccess(false);
// // // //     setTxHash(null);

// // // //     try {
// // // //       console.log("Creating collection with:", {
// // // //         name,
// // // //         symbol,
// // // //         contractAddress,
// // // //       });
// // // //       // Verify ABI and encode data
// // // //       if (
// // // //         !contractABI ||
// // // //         !contractABI.find((fn) => fn.name === "createCollection")
// // // //       ) {
// // // //         throw new Error("createCollection not found in ABI");
// // // //       }
// // // //       const iface = new ethers.Interface(contractABI);
// // // //       const data = iface.encodeFunctionData("createCollection", [name, symbol]);
// // // //       console.log("Encoded data:", data); // Debug the encoded data

// // // //       const tx = await signer.sendTransaction({
// // // //         to: contractAddress,
// // // //         data: data || "0x", // Fallback to ensure data is present
// // // //         gasLimit: 200000,
// // // //       });
// // // //       setTxHash(tx.hash);

// // // //       setIsPending(false);
// // // //       setIsConfirming(true);

// // // //       const receipt = await tx.wait();
// // // //       console.log("Transaction receipt:", receipt);

// // // //       setIsConfirming(false);
// // // //       setIsSuccess(true);
// // // //     } catch (err) {
// // // //       console.error("Error creating collection:", err);
// // // //       setError(err);
// // // //       setIsPending(false);
// // // //       setIsConfirming(false);
// // // //     }
// // // //   };

// // // //   return {
// // // //     createCollectionOnChain,
// // // //     txHash,
// // // //     isPending,
// // // //     isConfirming,
// // // //     isSuccess,
// // // //     isError: !!error,
// // // //     error,
// // // //   };
// // // // };

// // // // export default useCreateCollection;

// // // import { useState, useEffect } from "react";
// // // import { useWalletClient } from "wagmi";
// // // import { ethers } from "ethers";
// // // import useConstants from "./useConstants";

// // // const useCreateCollection = () => {
// // //   const { contractAddress, contractABI } = useConstants();
// // //   const { data: walletClient } = useWalletClient();

// // //   const [error, setError] = useState(null);
// // //   const [isPending, setIsPending] = useState(false);
// // //   const [isConfirming, setIsConfirming] = useState(false);
// // //   const [isSuccess, setIsSuccess] = useState(false);
// // //   const [txHash, setTxHash] = useState(null);
// // //   const [signer, setSigner] = useState(null);

// // //   useEffect(() => {
// // //     let isMounted = true;

// // //     const initializeSigner = async () => {
// // //       if (!walletClient) {
// // //         if (isMounted) setSigner(null);
// // //         return;
// // //       }

// // //       try {
// // //         const provider = new ethers.BrowserProvider(
// // //           walletClient.transport,
// // //           "any"
// // //         );
// // //         const newSigner = await provider.getSigner();
// // //         if (isMounted) setSigner(newSigner);
// // //       } catch (err) {
// // //         console.error("Error initializing signer:", err);
// // //         if (isMounted) setError(err);
// // //       }
// // //     };

// // //     initializeSigner();

// // //     return () => {
// // //       isMounted = false;
// // //     };
// // //   }, [walletClient]);

// // //   const createCollectionOnChain = async (name, symbol) => {
// // //     if (!signer) {
// // //       setError(new Error("Wallet not connected or signer not initialized"));
// // //       setIsPending(false);
// // //       return;
// // //     }

// // //     setError(null);
// // //     setIsPending(true);
// // //     setIsConfirming(false);
// // //     setIsSuccess(false);
// // //     setTxHash(null);

// // //     try {
// // //       console.log("Creating collection with:", {
// // //         name,
// // //         symbol,
// // //         contractAddress,
// // //       });
// // //       const iface = new ethers.Interface(contractABI);
// // //       const data = iface.encodeFunctionData("createCollection", [name, symbol]);
// // //       console.log("Encoded data:", data);

// // //       // Create a frozen transaction object to prevent modification
// // //       const txRequest = Object.freeze({
// // //         to: contractAddress,
// // //         data: data,
// // //         gasLimit: 200000,
// // //       });
// // //       console.log("Transaction request:", txRequest); // Debug the request

// // //       const tx = await signer.sendTransaction(txRequest);
// // //       setTxHash(tx.hash);

// // //       setIsPending(false);
// // //       setIsConfirming(true);

// // //       const receipt = await tx.wait();
// // //       console.log("Transaction receipt:", receipt);

// // //       setIsConfirming(false);
// // //       setIsSuccess(true);
// // //     } catch (err) {
// // //       console.error("Error creating collection:", err);
// // //       setError(err);
// // //       setIsPending(false);
// // //       setIsConfirming(false);
// // //     }
// // //   };

// // //   return {
// // //     createCollectionOnChain,
// // //     txHash,
// // //     isPending,
// // //     isConfirming,
// // //     isSuccess,
// // //     isError: !!error,
// // //     error,
// // //   };
// // // };

// // // export default useCreateCollection;
// // import { useState, useEffect } from "react";
// // import { useWalletClient } from "wagmi";
// // import { ethers } from "ethers";
// // import useConstants from "./useConstants";

// // const useCreateCollection = () => {
// //   const { contractAddress, contractABI } = useConstants();
// //   const { data: walletClient } = useWalletClient();

// //   const [error, setError] = useState(null);
// //   const [isPending, setIsPending] = useState(false);
// //   const [isConfirming, setIsConfirming] = useState(false);
// //   const [isSuccess, setIsSuccess] = useState(false);
// //   const [txHash, setTxHash] = useState(null);
// //   const [contract, setContract] = useState(null);

// //   useEffect(() => {
// //     let isMounted = true;

// //     const initializeContract = async () => {
// //       if (!walletClient) {
// //         if (isMounted) setContract(null);
// //         return;
// //       }

// //       try {
// //         const provider = new ethers.BrowserProvider(
// //           walletClient.transport,
// //           "any"
// //         );
// //         const signer = await provider.getSigner();
// //         const newContract = new ethers.Contract(
// //           contractAddress,
// //           contractABI,
// //           signer
// //         );
// //         if (isMounted) setContract(newContract);
// //       } catch (err) {
// //         console.error("Error initializing contract:", err);
// //         if (isMounted) setError(err);
// //       }
// //     };

// //     initializeContract();

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, [walletClient, contractAddress, contractABI]);

// //   const createCollectionOnChain = async (name, symbol) => {
// //     if (!contract) {
// //       setError(new Error("Wallet not connected or contract not initialized"));
// //       setIsPending(false);
// //       return;
// //     }

// //     setError(null);
// //     setIsPending(true);
// //     setIsConfirming(false);
// //     setIsSuccess(false);
// //     setTxHash(null);

// //     try {
// //       console.log("Creating collection with:", {
// //         name,
// //         symbol,
// //         contractAddress,
// //       });
// //       const tx = await contract.createCollection(name, symbol, {
// //         gasLimit: 200000,
// //       });
// //       setTxHash(tx.hash);

// //       setIsPending(false);
// //       setIsConfirming(true);

// //       const receipt = await tx.wait();
// //       console.log("Transaction receipt:", receipt);

// //       setIsConfirming(false);
// //       setIsSuccess(true);
// //     } catch (err) {
// //       console.error("Error creating collection:", err);
// //       setError(err);
// //       setIsPending(false);
// //       setIsConfirming(false);
// //     }
// //   };

// //   return {
// //     createCollectionOnChain,
// //     txHash,
// //     isPending,
// //     isConfirming,
// //     isSuccess,
// //     isError: !!error,
// //     error,
// //   };
// // };

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

//   useEffect(() => {
//     let isMounted = true;

//     const initialize = async () => {
//       if (!walletClient) {
//         if (isMounted) setError(new Error("Wallet not connected"));
//         return;
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//     };
//   }, [walletClient]);

//   const createCollectionOnChain = async (name, symbol) => {
//     if (!walletClient) {
//       setError(new Error("Wallet not connected"));
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
//       console.log("Encoded data:", data);

//       const txHash = await walletClient.sendTransaction({
//         account: walletClient.account,
//         to: contractAddress,
//         data: data,
//         gas: 200000n, // Use BigInt for gas
//       });
//       setTxHash(txHash);

//       setIsPending(false);
//       setIsConfirming(true);

//       const provider = new ethers.BrowserProvider(
//         walletClient.transport,
//         "any"
//       );
//       const receipt = await provider.waitForTransaction(txHash);
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

// // export default useCreateCollection;
import { useState, useEffect } from "react";
import { useWalletClient } from "wagmi";
import { ethers } from "ethers";
import useConstants from "./useConstants";

const useCreateCollection = () => {
  const { contractAddress, contractABI } = useConstants();
  const { data: walletClient } = useWalletClient();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (!walletClient) {
        if (isMounted) setError(new Error("Wallet not connected"));
        return;
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [walletClient]);

  const createCollectionOnChain = async (name, symbol) => {
    if (!walletClient) {
      setError(new Error("Wallet not connected"));
      setIsPending(false);
      return;
    }

    setError(null);
    setIsPending(true);
    setIsConfirming(false);
    setIsSuccess(false);
    setTxHash(null);

    try {
      console.log("Creating collection with:", {
        name,
        symbol,
        contractAddress,
      });
      const iface = new ethers.Interface(contractABI);
      const data = iface.encodeFunctionData("createCollection", [name, symbol]);
      console.log("Encoded data:", data);

      const txHash = await walletClient.sendTransaction({
        account: walletClient.account,
        to: contractAddress,
        data: data,
        gas: 200000n,
      });
      setTxHash(txHash);

      setIsPending(false);
      setIsConfirming(true);

      const provider = new ethers.BrowserProvider(
        walletClient.transport,
        "any"
      );
      const receipt = await provider.waitForTransaction(txHash);
      console.log("Transaction receipt:", receipt);

      setIsConfirming(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error creating collection:", err);
      setError(err);
      setIsPending(false);
      setIsConfirming(false);
    }
  };

  return {
    createCollectionOnChain,
    txHash,
    isPending,
    isConfirming,
    isSuccess,
    isError: !!error,
    error,
  };
};

export default useCreateCollection;
