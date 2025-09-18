import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { arbitrum, localhost, mainnet, sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from environment
const projectId = import.meta.env.VITE_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("VITE_CONNECT_PROJECT_ID is not defined in .env file");
}

// 2. Create a metadata object
const metadata = {
  name: "Dream NFT Marketplace",
  description: "Development of Dream NFT Marketplace",
  url: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [localhost, sepolia]; // Add more networks as needed

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false, // Set to true only if using SSR
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    email: true, // Optional
    socials: ["google"], // Optional
  },

  themeMode: "dark",
  // themeVariables: {
  //   // "--w3m-color-mix": "#bfff6b",
  //   // "--w3m-color-mix-strength": 100,
  //   "--w3m-color": "#bfff6b",
  //   "--w3m-accent": "#bfff6b",

    "--w3m-font-family": "var(--font-unbounded)",
  // },
});

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
