import React, { useState } from "react";

const BuyNft = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="buyNft-section border bg-primary-black">
      <div className="my-5 flex flex-row px-10 bg-primary-black font-unbounded text-white/90">
        {/* Left */}
        <div className="left flex items-start">
          <div className="box w-fit rounded-sm p-4 flex justify-center items-center bg-paragraph/10">
            <img
              src="/Sith_Warrior.jpg"
              alt="assassin"
              className="max-h-96 object-contain rounded-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="right flex-1 px-6">
          <div>
            <h1 className="p-0 leading-none text-action-btn-green font-unbounded font-semibold text-lg">
              RED <span className="text-white">ASSASSIN</span>{" "}
              <span className="text-white">#456</span>
            </h1>
          </div>

          {/* Collection / Owner */}
          <div className="flex items-center gap-2 text-sm font-light mt-4">
            <div className="flex items-center gap-2">
              <img
                src="/alchemyrefiner.jpg"
                alt="profile"
                className="w-6 h-6 rounded-full bg-gray-700 object-cover border border-gray-600/10"
              />
              <h2>Collection Name</h2>
            </div>
            <div className="text-paragraph/50">|</div>
            <div className="flex gap-2">
              <p className="text-paragraph">Owned by</p>
              <h2>0x4ea6...d7c2</h2>
            </div>
          </div>

          {/* Price & Buy */}
          <div className="border border-gray-700 rounded-md p-4 my-4 bg-black/20">
            <p className="font-light text-paragraph text-xs">BUY FOR</p>
            <h2 className="text-lg my-4 font-medium">
              50.00 ETH{" "}
              <span className="text-xs text-paragraph">($230.3k)</span>
            </h2>
            <button className="mt-3 w-full bg-action-btn-green text-black py-2 rounded-md font-normal cursor-pointer hover:bg-action-btn-green/80">
              Buy now
            </button>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-6 border-b border-gray-700 pb-1 text-xs ">
              <button
                onClick={() => setActiveTab("traits")}
                className={`cursor-pointer font-light ${
                  activeTab === "traits"
                    ? "text-action-btn-green font-medium"
                    : "text-paragraph hover:text-action-btn-green"
                }`}
              >
                Traits
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`cursor-pointer font-light ${
                  activeTab === "activity"
                    ? "text-action-btn-green font-medium "
                    : "text-paragraph hover:text-action-btn-green "
                }`}
              >
                Activity
              </button>
            </div>

            {/* Tab content */}
            <div className="mt-4 border border-gray-700 rounded-sm p-4 font-light text-xs bg-black/20">
              {activeTab === "traits" && (
                <div>
                  <p className="small-paragraph ">Power: Legendary</p>
                  <p className=" small-paragraph"> Weapon: Dual Sabers</p>
                  <p className="small-paragraph"> Rarity: Ultra Rare</p>
                </div>
              )}
              {activeTab === "activity" && (
                <div>
                  <p className="small-paragraph ">
                    Sold for 40 ETH · 2 days ago
                  </p>
                  <p className="small-paragraph">
                    Listed for 50 ETH · 1 hour ago
                  </p>
                </div>
              )}
              {activeTab === "" && (
                <p className="small-paragraph text-paragraph/50 text-center ">
                  Click Traits or Activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNft;
