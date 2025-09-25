import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { AppKitButton, useAppKitAccount } from "@reown/appkit/react";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { address, isConnected } = useAppKitAccount(); // Wallet info

  return (
    <div className="navbar flex justify-between items-center text-white flex-row py-4 px-10 bg-dark-black font-unbounded tracking-wide">
      <div className="logo font-bold">
        <h2 className="font-medium text-xs font-unbounded">Dream NFTs</h2>
      </div>

      <ul className="flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
        <Link to="/create-collection">
          <li className="cursor-pointer">CREATE COLLECTION</li>
        </Link>
        <Link to="/explore">
          <li className="cursor-pointer">EXPLORE</li>
        </Link>
      </ul>

      <div className="flex flex-row items-center gap-3">
        <AppKitButton />
        {isConnected && (
          <LiaUserCircleSolid
            size={32}
            className="text-action-btn-green cursor-pointer"
            onClick={() => navigateTo("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
