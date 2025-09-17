import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateCollection = () => {
  return (
    <>
      <Navbar />
      <div className="create-collection flex w-full justify-center items-center gap-10 flex-col bg-primary-black px-10 py-10 font-unbounded text-white">
        <h1 className="text-action-btn-green font-semibold text-3xl ">
          CREATE <span className="text-white">COLLECTION</span>
        </h1>

        <form
          action=""
          className="border-1 border-paragraph/50 rounded-md px-10  w-1/2 flex flex-col gap-6 py-10"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="font-light ">
              Name
            </label>
            <input
              type="text"
              placeholder="Board Apes etc."
              className="w-full border-1 border-paragraph/70 px-2 py-2 rounded-sm focus:border-action-btn-green"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="font-light">
              Symbol
            </label>
            <input
              type="text"
              placeholder="BA etc"
              className="w-full border-1 border-paragraph/70 px-2 py-2 rounded-md"
            />
          </div>

          <div
            className="flex flex-col gap-2 w-full
          "
          >
            <button className="w-full bg-action-btn-green py-2  rounded-sm text-black">
              CREATE
            </button>
            <span className=" font-extralight text-xs  text-red-600/90">
              *Note: Name and Symbol cannot be changed in future
            </span>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateCollection;
