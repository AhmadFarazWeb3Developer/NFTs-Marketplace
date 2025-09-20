import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore.jsx";
import BuyNFT from "./pages/BuyNFT.jsx";
import SingleCollection from "./pages/SingleCollection.jsx";
import CreateCollection from "./pages/CreateCollection.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import ConnectKitProvider from "./blockchain-interaction/ConnectKitProvider.jsx";
import { WagmiProvider } from "wagmi";
import wagmiConfig from "../wagmiConfig.js";

import { localhost } from "wagmi/chains";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/create-collection",
        element: <CreateCollection />,
      },

      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/explore/buyNft",
        element: <BuyNFT />,
      },
      {
        path: "/explore/collection",
        element: <SingleCollection />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig} initialChainId={localhost.id}>
      <ConnectKitProvider
        options={{
          embedGoogleFonts: true,
          showBalance: true,
          hideQuestionMarkCTA: true,
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </ConnectKitProvider>
    </WagmiProvider>
  </StrictMode>
);
