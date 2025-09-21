import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";

// Define Anvil chain (chainId 31337)
const anvilChain = {
  ...localhost,
  id: 31337,
  name: "Anvil",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
};

export const wagmiConfig = createConfig({
  chains: [anvilChain],
  transports: {
    [anvilChain.id]: http("http://127.0.0.1:8545"),
  },
});

export default wagmiConfig;
