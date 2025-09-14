import CollectionCard from "../CollectionCard";
import Navbar from "../Navbar";

import { LucideSortAsc } from "lucide-react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { GrNext, GrPrevious } from "react-icons/gr";
const AllCollections = () => {
  return (
    <>
      <Navbar />
      <div className="all-collection w-full flex  items-center flex-col bg-primary-black  text-white px-10 py-4 text-sm ">
        <h1 className="font-unbounded text-action-btn-green font-semibold text-lg">
          ALL <span className="text-white">COLLECTIONS</span>
        </h1>

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

          <div className="right-container border-1  border-white/5 rounded-sm ">
            <CollectionCard />
          </div>
        </div>

        <div className="next-previous-btns flex flex-row items-center  gap-5  font-unbounded font-extralight text-action-btn-green">
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
    </>
  );
};

export default AllCollections;
