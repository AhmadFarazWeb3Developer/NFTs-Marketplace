import React from "react";

const SingleCollectionsCard = () => {
  return (
    <>
      <div className="card border-1 border-paragraph/50 rounded-md flex justify-center flex-col items-center w-1/5 gap-2 pb-2 bg-black/20 ">
        <div className=" rounded-md">
          <img src="/scifiHumanoid.jpg" alt="" className="rounded-md" />
        </div>

        <div className="flex justify-between  w-full px-2 my-2">
          <h3>50.00 ETH</h3>
          <p>#245</p>
        </div>
        <div className="w-full px-2 ">
          <button className="w-full bg-action-btn-green  font-light text-black  py-1 rounded-sm cursor-pointer">
            BUY NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCollectionsCard;
