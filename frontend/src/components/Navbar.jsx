import React from "react";

const Navbar = () => {
  return (
    <>
      <div
        className="navbar"
        class="flex justify-between  items-center text-white flex-row border-1 border-black py-4 px-10 bg-dark-black font-unbounded tracking-wide"
      >
        <div className="logo" class="font-bold ">
          <h2 class="font-bold font-unbounded ">Dream NFT Marketplace</h2>
        </div>

        <ul class=" decoration-0 flex justify-center gap-10 items-center text-sm text-stroke-3 text-paragraph">
          <li class="">CREATE COLLECTION</li>
          <li>EXPLORE</li>
        </ul>

        <button class=" py-2 px-4 rounded-3xl bg-action-btn-green text-black font-unbounded text-sm">
          Connect Wallet
        </button>
      </div>
    </>
  );
};

export default Navbar;
