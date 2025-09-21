import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";
import { injected, metaMask } from "@wagmi/connectors"; // Updated import

const anvilChain = {
  ...localhost,
  id: 31337,
  name: "Anvil",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
};

export const wagmiConfig = createConfig({
  chains: [anvilChain],
  connectors: [
    injected({ shimDisconnect: true }),
    metaMask({ shimDisconnect: true }),
  ],
  transports: {
    [anvilChain.id]: http("http://127.0.0.1:8545"),
  },
  pollingInterval: 4000,
  syncConnectedChain: true,
});

export default wagmiConfig;
