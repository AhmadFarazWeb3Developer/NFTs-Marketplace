import { WagmiProvider, createConfig, http } from "wagmi";
import { anvil } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [anvil],
    transports: {
      [anvil.id]: http(`http:// 127.0.0.1:8545`),
    },

    walletConnectProjectId: import.meta.env.VITE_CONNECT_PROJECT_ID,

    // Required App Info
    appName: "NFT MARKETPLACE",

    // Optional App Info
    appDescription: "NFT MARKETPLACE",
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
