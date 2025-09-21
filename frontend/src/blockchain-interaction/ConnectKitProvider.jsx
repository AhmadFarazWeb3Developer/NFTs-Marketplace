import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from "wagmi";
import wagmiConfig from "../../wagmiConfig.js";

const queryClient = new QueryClient();

const ConnectKit = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          options={{
            embedGoogleFonts: true,
            showBalance: true,
            hideQuestionMarkCTA: true,
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ConnectKit;
