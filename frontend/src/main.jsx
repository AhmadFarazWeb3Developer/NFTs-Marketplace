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

// ----- Reown AppKit Setup -----
import { AppKitProvider, createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
// import { hardhat } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_CONNECT_PROJECT_ID;

const hardhat = {
  id: 31337,
  name: "Hardhat",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
  blockExplorers: { default: { name: "Hardhat", url: "" } },
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [hardhat],
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
      { path: "/explore/buyNft", element: <BuyNFT /> },
      { path: "/explore/collection", element: <SingleCollection /> },
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
