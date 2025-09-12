import React from "react";

const Navbar = () => {
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
          <li className="">CREATE COLLECTION</li>
          <li>EXPLORE</li>
        </ul>

        <button class=" py-2 px-4 rounded-3xl bg-action-btn-green text-black font-unbounded text-xs  font-semibold">
          Connect Wallet
        </button>
      </div>
    </>
  );
};

export default Navbar;
