import { ethers, formatEther } from "ethers";

export const hardhat_provider = new ethers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);
export const polygon_amoy_provider = new ethers.JsonRpcProvider(
  "https://rpc-amoy.polygon.technology"
);

console.log("key :", import.meta.env.BNB_ALCHEMY_API_KEY);
export const bnb_smart_chain_provider = new ethers.JsonRpcProvider(
  `https://bnb-testnet.g.alchemy.com/v2/${
    import.meta.env.VITE_BNB_ALCHEMY_API_KEY
  }`
);
