import { WagmiProvider, createConfig, http } from "wagmi";
import { anvil, localhost, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia, anvil],

    transports: {
      [anvil.id]: http("http://127.0.0.1:8545"),

      // [sepolia.id]: http(
      //   `https://eth-sepolia.g.alchemy.com/v2/${
      //     import.meta.env.VITE_ALCHEMY_RPC_URL_KEY
      //   }`
      // ),
    },

    walletConnectProjectId: import.meta.env.VITE_CONNECT_PROJECT_ID,

    appName: "Dream NFT Marketplace",
    appDescription: "Dream NFT Marketplace",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

const ConnectKit = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ConnectKit;
