// import { useWalletClient, useAccount } from "wagmi";
// import { ethers } from "ethers";
// import useConstants from "../hooks/useConstants";

// export default function useFactoryContract() {
//   const { contractAddress, contractABI } = useConstants();
//   const { data: walletClient } = useWalletClient();
//   const { address } = useAccount();

//   if (!walletClient) return null;

//   // Wrap wagmi WalletClient into ethers.js provider
//   const provider = new ethers.BrowserProvider(walletClient.transport);
//   const contract = new ethers.Contract(contractAddress, contractABI, provider);

//   return contract.connect(provider.getSigner(address));
// }

import { useWalletClient, useAccount } from "wagmi";
import { ethers } from "ethers";
import useConstants from "../hooks/useConstants";

export default function useFactoryContract() {
  const { contractAddress, contractABI } = useConstants();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  if (!walletClient) return null;

  const provider = new ethers.BrowserProvider(walletClient.transport, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return contract;
}
