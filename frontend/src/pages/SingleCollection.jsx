import React from "react";
import SingleCollectionsCard from "../components/single-collections-card/SingleCollectionsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Copy } from "lucide-react";

import { SiEthereum } from "react-icons/si";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineTableRows } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import MintNFT from "./MintNFT";

const SingleCollection = () => {
  return (
    <>
      <Navbar />

      <div className="single-collection  bg-primary-black text-white px-10 pt-4 font-unbounded">
        <div className="profile border-1 border-paragraph/40 rounded-sm flex w-full p-4">
          <div className="left w-1/2 flex flex-row ">
            <div className="w-16 h-16 rounded-full border-1 border-paragraph/50">
              <img
                src="/nida.jpg"
                alt=""
                className="object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col pl-2 gap-1 justify-center ">
              <h3 className="text-action-btn-green font-medium">
                RED <span className="text-white">ASSASSIN </span>
                <span className="text-white font-light">#456</span>
              </h3>

              <div className=" flex flex-row gap-2  font-extralight text-xs">
                <div className="py-1 px-2 flex items-center border-1 border-paragraph/70 rounded-sm bg-paragraph/30 gap-1">
                  <SiEthereum />
                  <p>ETHEREUM</p>
                </div>
                <div className="py-1 px-2 border rounded-sm border-paragraph/70 bg-paragraph/30 gap-2 flex">
                  <p>0xaf23...0012</p>
                  <Copy strokeWidth={0.7} size={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="right w-1/2 flex justify-end gap-10">
            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph ">ITEMS</p>
              <p>500</p>
            </div>

            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph">AVG PRICE</p>
              <p>25.67 ETH</p>
            </div>

            <div className="flex flex-col justify-end items-end gap-2">
              <p className="text-xs font-light text-paragraph"> TOTAL VOLUME</p>
              <p>1.3 M</p>
            </div>
          </div>
        </div>

        <div className="search-layout border-b-1 border-paragraph/50 flex gap-4 items-center w-full py-4">
          <div className="search border-1  border-paragraph/50 w-1/3 flex items-center justify-between px-2  rounded-sm">
            <input
              type="search"
              placeholder="Search NFT by name or Id"
              className="placeholder:text-xs placeholder:font-extralight placeholder:text-paragraph/70  "
            />
            <CiSearch className="text-paragraph/70" />
          </div>
          <div className="flex gap-2">
            <CiGrid41 size={24} className="text-paragraph/70" />
            <MdOutlineTableRows size={24} className="text-paragraph/70" />
          </div>
        </div>
        <div className="nft-cards py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          <SingleCollectionsCard />
          <SingleCollectionsCard />
          <SingleCollectionsCard />
          <SingleCollectionsCard />
          <SingleCollectionsCard />
        </div>
        <div className="border-1   flex items-center justify-center">
          <MintNFT />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleCollection;
