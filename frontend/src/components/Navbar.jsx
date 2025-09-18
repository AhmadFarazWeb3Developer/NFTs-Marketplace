import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Explore from "../pages/Explore";
import { AppKitAccountButton, AppKitConnectButton } from "@reown/appkit/react";

import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import CustomConnectButton from "../blockchain-interaction/CustomConnectButton";

const Navbar = () => {
  const navigateTo = useNavigate("");

  const { isConnected, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected, isConnecting, isDisconnected]);

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

        {/* <ConnectKitButton /> */}

        <CustomConnectButton />
      </div>

      <Routes>
        <Route path="/create-collection"></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>
    </>
  );
};

export default Navbar;
