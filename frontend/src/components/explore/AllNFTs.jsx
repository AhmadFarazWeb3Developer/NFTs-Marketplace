import React from "react";
import NftCard from "./NftCard";

import { LucideSortAsc } from "lucide-react";

import { GrNext, GrPrevious } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import Footer from "../Footer";

const AllNFTs = () => {
  return (
    <>
      <div className="all-nfts flex flex-col items-center bg-primary-black px-10  border-1 ">
        <div className="w-full border-t-1 border-white/10 mb-10"></div>

        <div className="flex  w-full ">
          <div className="let-support w-full"></div>
          <div className=" w-full flex justify-center items-center ">
            <h1 className="font-unbounded font-semibold text-action-btn-green  mb-6  ">
              ALL <span className="text-white">NFTs</span>
            </h1>
          </div>
          <div className="search-by-address  w-full  text-end">
            <div className="flex items-center gap-2   justify-end">
              <input
                type="search"
                placeholder="Search Owner Address"
                className="search-owner-input pl-10 hover:w-1/2 hover:border-1 hover:text-left hover:pl-2 hover:border-action-btn-green outline-0 bg-white/5 px-6 py-1 rounded-full"
              />
              <FiSearch className="search-owner-icon" />
            </div>
          </div>
        </div>

        <div className="container flex gap-4 ">
          <div className="left rounded-sm py-2 pl-5 pr-10  bg-white/5 backdrop-blur-md flex flex-col gap-1 text-paragraph font-unbounded text-xs">
            <div className="flex flex-row gap-1 items-center">
              <LucideSortAsc size={16} />
              <h2>Sort By</h2>
            </div>

            <div className="flex flex-row items-center  gap-3 mt-4 font-light cursor-pointer">
              <input type="radio" className="bg-paragraph" />
              <label htmlFor="">Name</label>
            </div>

            <div className="flex flex-row items-center  gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">#ID</label>
            </div>

            <div className="flex flex-row  items-center gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Price</label>
            </div>
            <div className="flex flex-row  items-center  gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Items</label>
            </div>
            <div className="flex flex-row  items-center   gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Owners</label>
            </div>
            <div className="flex flex-row  items-center gap-3 mt-1 w-24 font-light">
              <input type="radio" />
              <label htmlFor="">For Sale</label>
            </div>
            <div className="flex flex-row  items-center gap-3 mt-1 w-24 font-light">
              <input type="radio" />
              <label htmlFor="">Sold</label>
            </div>
          </div>
          <NftCard />
        </div>

        <div className="next-previous-btns flex flex-row items-center justify-center py-4 text-sm gap-5  font-unbounded font-extralight  w-full  text-action-btn-green">
          <div className=" cursor-pointer">
            <GrPrevious />
          </div>
          <div className="">0</div>
          <span>/</span>
          <div>901</div>
          <div className="flex justify-center items-center cursor-pointer">
            <GrNext />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllNFTs;
