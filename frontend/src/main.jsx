import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Explore from "./pages/Explore.jsx";
import BuyNFT from "./pages/BuyNFT.jsx";
import SingleCollection from "./pages/SingleCollection.jsx";
import CreateCollection from "./pages/CreateCollection.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import UpdateNFTSaleStatus from "./pages/UpdateNFTSaleStatus.jsx";

// ----- Reown AppKit Setup -----
import { AppKitProvider, createAppKit } from "@reown/appkit/react";

import {
  hardhat,
  polygonAmoy,
  bscTestnet,
  arbitrumSepolia,
  avalancheFuji,
  optimismSepolia,
  mainnet,
  polygon,
  zksync,
  avalanche,
  arbitrum,
} from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import BuyCollection from "./pages/BuyCollection.jsx";

const projectId = import.meta.env.VITE_CONNECT_PROJECT_ID;

createAppKit({
  autoConnect: false,
  adapters: [new EthersAdapter()],
  networks: [
    mainnet,
    polygon,
    zksync,
    avalanche,
    arbitrum,
    optimismSepolia,
    polygonAmoy,
    bscTestnet,
    arbitrumSepolia,
    avalancheFuji,
  ], //   add any network here, harhdat , polygonAmoy, bscTestnet, arbitrumSepolia, avalancheFuji
  projectId,
  features: {
    analytics: true,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "var(--font-unbounded)",
    "--w3m-font-size-master": "10",
    "--w3m-border-radius-master": "10",
  },
});

// ----- Routes -----
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/create-collection", element: <CreateCollection /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/explore/buyNft/:tokenId", element: <BuyNFT /> },
      {
        path: "/explore/collection/:collection",
        element: <SingleCollection />,
      },
      {
        path: "/dashboard/update-sale-status",
        element: <UpdateNFTSaleStatus />,
      },

      {
        path: "/buy-collection",
        element: <BuyCollection />,
      },
    ],
  },
]);

// ----- Render -----
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <RouterProvider router={router} />
    </AppKitProvider>
  </StrictMode>
);
