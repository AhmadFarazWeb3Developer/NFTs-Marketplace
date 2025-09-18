import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Explore from "../pages/Explore";

import { AppKitAccountButton, AppKitConnectButton } from "@reown/appkit/react";

const Navbar = () => {
  const navigateTo = useNavigate("");
  return (
    <>
      <div
        className="navbar"
        class="flex justify-between  items-center text-white flex-row  py-4 px-10 bg-dark-black font-unbounded tracking-wide"
      >
        <div className="logo" class="font-bold ">
          <h2 class="font-medium text-xs font-unbounded">Dream NFTs</h2>
        </div>

        <ul class=" decoration-0 flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
          <Link to="create-collection">
            <li className="cursor-pointer">CREATE COLLECTION</li>
          </Link>
          <Link to="explore">
            <li className="cursor-pointer">EXPLORE</li>
          </Link>
        </ul>

        {/* <div className="relative border-1 ">
          <p className="absolute text-black">Connect Wallet</p>
          <AppKitConnectButton
            className="connect-button absolute "
            size="sm"
            loadingLabel="Connecting..."
          />
        </div> */}

        <AppKitConnectButton
          className="connect-button"
          size="md"
          loadingLabel="Connecting..."
        />
      </div>

      <Routes>
        <Route path="/create-collection"></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>
    </>
  );
};

export default Navbar;
