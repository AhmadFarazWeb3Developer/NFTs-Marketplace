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
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { anvil } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_CONNECT_PROJECT_ID;
const networks = [anvil];
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};
// Initialize AppKit BEFORE rendering React
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
  themeMode: "dark", // This will match your dark app background
  themeVariables: {
    "--w3m-accent": "#00FF00", // your action button color
    "--w3m-background": "#0a0a0a", // optional, matches dark background
    "--w3m-font-color": "#ffffff", // optional, ensures text is visible
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
    <RouterProvider router={router} />
  </StrictMode>
);
