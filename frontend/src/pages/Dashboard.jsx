import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AllCollections from "../components/explore/AllCollections";
import CollectionCard from "../components/CollectionCard";
import MintNFT from "./MintNFT";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address } = useAccount();

  return (
    <>
      <Navbar />
      <div className="dashboard w-full px-10 bg-primary-black font-unbounded pt-6 pb-4">
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
                <div className="py-1 px-2 flex items-center border-1 border-paragraph/70 rounded-sm bg-paragraph/30 gap-1 text-white ">
                  <p className="text-white">{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collections px-10 bg-primary-black text-white  font-unbounded">
        <h1 className="text-action-btn-green font-bold"> COLLECTIONS</h1>
        <CollectionCard />
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
