// src/wagmi.config.js
import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";
import { privateKeyToAccount } from "viem/accounts";

// Define Anvil chain (chainId 31337)
const anvilChain = {
  ...localhost,
  id: 31337,
  name: "Anvil",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
};

// Anvil test account private key (from anvil output, replace with one of yours)
const ANVIL_PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export const wagmiConfig = createConfig({
  chains: [anvilChain],
  transports: {
    [anvilChain.id]: http("http://127.0.0.1:8545"),
  },
  // Optional: Configure a client with the private key for signing
  client: ({ chain }) => ({
    chain,
    transport: http("http://127.0.0.1:8545"),
    account: privateKeyToAccount(ANVIL_PRIVATE_KEY),
  }),
});

export default wagmiConfig;
