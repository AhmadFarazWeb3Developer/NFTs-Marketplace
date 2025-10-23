import { ethers, formatEther } from "ethers";

export const hardhat_provider = new ethers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);
export const polygon_amoy_provider = new ethers.JsonRpcProvider(
  "https://rpc-amoy.polygon.technology"
);

export const bnb_smart_chain_provider = new ethers.JsonRpcProvider(
  `https://bnb-testnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_RPC_API_KEY
  }`
);

export const arbitrum_sepolia_chain_provider = new ethers.JsonRpcProvider(
  `https://arb-sepolia.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_RPC_API_KEY
  }`
);
export const avalanche_fuji = new ethers.JsonRpcProvider(
  `https://avax-fuji.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_RPC_API_KEY
  }`
);
export const optimism_sepolia = new ethers.JsonRpcProvider(
  `https://opt-sepolia.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_RPC_API_KEY
  }`
);
