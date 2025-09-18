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
    <ConnectKitProvider
      // customeTheme={{
      //   "--ck-font-family": "'Unbounded', sans-serif",
      //   "--ck-border-radius": "12px",
      //   "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
      //   "--ck-connectbutton-background": "#bfff6b",
      //   "--ck-connectbutton-color": "#000",
      //   "--ck-connectbutton-font-size": "14px",
      //   "--ck-connectbutton-font-weight": "600",
      //   "--ck-connectbutton-border-radius": "8px",
      //   "--ck-connectbutton-box-shadow":
      //     "0px 4px 12px rgba(191, 255, 107, 0.3)",
      //   "--ck-connectbutton-hover-background": "#aaff4d",
      //   "--ck-connectbutton-active-background": "#95ff33",
      // }}
      options={{
        embedGoogleFonts: true,
        showBalance: true,
        hideQuestionMarkCTA: true,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConnectKitProvider>
  </StrictMode>
);
