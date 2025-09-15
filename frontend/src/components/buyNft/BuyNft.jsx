import React from "react";

const BuyNft = () => {
  return (
    <>
      <div className="flex flex-row w-full justify-center border-1 px-10">
        <div className="left border-1">
          <div className="box">
            <img src="" alt="assassin" />
          </div>
        </div>
        <div className="right border-1">
          <div>
            <h1>
              RED ASSASSIN <span>#456</span>
            </h1>
          </div>

          <div className="flex">
            <div className="flex">
              {/* <div> */}
              <img src="" alt="profile" />
              {/* </div> */}
              <h2>Collection Name</h2>
            </div>
            <div>|</div>
            <div className="flex">
              <p>Owned by</p>
              <h2>0x4ea6...d7c2</h2>
            </div>
          </div>
          <div>
            <p>Buy For</p>
            <h2>
              50.00 ETH <span>($230.3k)</span>
            </h2>
            <button>Buy now</button>
          </div>

          <div>
            <div className="flex">
              <h2>Traits</h2>
              <h2>Activity</h2>
            </div>

            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNft;
