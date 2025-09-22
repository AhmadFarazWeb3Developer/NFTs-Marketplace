// import { ethers } from "ethers";

// export function getEthersProvider() {
//   if (!window.ethereum) {
//     throw new Error("No crypto wallet found");
//   }
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   return provider;
// }

// export async function getSigner() {
//   const provider = getEthersProvider();
//   await provider.send("eth_requestAccounts", []); // prompt connect
//   const signer = await provider.getSigner();
//   return signer;
// }

// export async function getFactoryContract(contractAddress, contractABI) {
//   const signer = await getSigner();
//   return new ethers.Contract(contractAddress, contractABI, signer);
// }

// export function getReadContract(contractAddress, contractABI) {
//   const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//   return new ethers.Contract(contractAddress, contractABI, provider);
// }
