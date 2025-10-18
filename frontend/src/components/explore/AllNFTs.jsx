import React from "react";
import { LucideSortAsc } from "lucide-react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { AiOutlineInbox } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";

import Footer from "../Footer";
import NftCard from "./NftCard";
import useReadAllCollections from "../../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";
import useReadAggregateAllNFTs from "../../blockchain-interaction/hooks/nft/read/useReadAggregateAllNFTs";

const AllNFTs = () => {
  useReadFactoryContract();
  const allNFTs = useReadAggregateAllNFTs();

  console.log(allNFTs);

  return (
    <>
      <div className="all-nfts flex flex-col items-center bg-primary-black px-4 sm:px-10 py-6">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="font-unbounded font-semibold text-action-btn-green text-lg sm:text-2xl">
            ALL <span className="text-white">NFTs</span>
          </h1>
          <div className="flex items-center gap-2 mt-3 sm:mt-0 w-full sm:w-auto  ">
            <div className="relative flex items-center w-full sm:w-72">
              <FiSearch className="absolute left-3 text-white/60 text-base sm:text-lg pointer-events-none" />
              <input
                type="search"
                placeholder="Search Owner Address"
                className="pl-10 pr-4 py-2 w-full rounded-full bg-white/5 text-white placeholder-white/40 outline-none transition-all duration-300 focus:bg-white/10 focus:ring-2 focus:ring-action-btn-green focus:placeholder-white/60"
              />
            </div>
          </div>
        </div>

        <div className="containter  py-6 flex flex-row  gap-4">
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
            <div className="flex flex-row items-center   gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Remaining</label>
            </div>
          </div>

          <div className="flex-1  border-1  border-white/5 rounded-sm  ">
            <div className="hidden sm:block w-full overflow-x-auto">
              <table className="w-full table-fixed text-left text-white">
                <thead className="font-unbounded text-xs uppercase dark:text-gray-500 font-unbounded font-light ">
                  <tr>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3">NAME</th>
                    <th className="px-2 py-3">SYMBOL</th>
                    <th className="px-2 py-3">#ID</th>
                    <th className="px-2 py-3">PRICE</th>
                    <th className="px-2 py-3">OWNER</th>
                    <th className="px-2 py-3">STATUS</th>
                  </tr>
                </thead>

                <tbody className="font-unbounded font-light text-xs ">
                  {allNFTs === null ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center gap-2 text-white/70">
                          <ImSpinner2 className="animate-spin text-3xl" />
                          <span className="text-sm mt-2">Loading NFTs...</span>
                        </div>
                      </td>
                    </tr>
                  ) : allNFTs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center gap-2 text-white/70">
                          <AiOutlineInbox className="text-4xl" />
                          <span className="text-sm mt-2">No NFTs found.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    allNFTs.map((nft, idx) => (
                      <NftCard
                        key={`${nft.collectionAddress}-${nft.tokenId}-${idx}`}
                        {...nft}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden w-full flex flex-col gap-4">
              {allNFTs.length === 0 ? (
                <p className="text-white/70 text-center py-4">
                  Loading NFTs...
                </p>
              ) : (
                allNFTs.map((nft, idx) => (
                  <div
                    key={`${nft.collectionAddress}-${nft.tokenId}-${idx}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center bg-white/5 p-3 rounded-md gap-2"
                  >
                    <img
                      src={nft.tokenURI || "placeholder.jpg"}
                      alt={nft.name || "NFT"}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col flex-1 text-white text-xs">
                      <span>
                        <strong>Name:</strong> {nft.name || "—"}
                      </span>
                      <span>
                        <strong>Symbol:</strong> {nft.symbol || "—"}
                      </span>
                      <span>
                        <strong>ID:</strong> {nft.tokenId}
                      </span>
                      <span>
                        <strong>Price:</strong>{" "}
                        {nft.tokenPrice ? `${nft.tokenPrice} ETH` : "—"}
                      </span>
                      <span>
                        <strong>Owner:</strong> {nft.owner || "—"}
                      </span>
                      <span>
                        <strong>Status:</strong>{" "}
                        {nft.isForSale ? "For Sale" : "Not For Sale"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="next-previous-btns flex flex-row items-center justify-center py-4 text-sm gap-5 font-unbounded font-extralight w-full text-action-btn-green">
          <div className="cursor-pointer">
            <GrPrevious />
          </div>
          <div>0</div>
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
