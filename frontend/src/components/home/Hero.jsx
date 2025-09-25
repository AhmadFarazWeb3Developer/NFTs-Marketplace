import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero-section flex flex-row justify-center gap-10 my-10 w-full px-14 items-center">
        {/* =============================== LEFT ========================================= */}
        <div className="left font-unbounded flex justify-center relative rounded-md">
          <div>
            <img
              src="rank1Nft.png"
              alt="Rank 1 NFT"
              className="w-2xl h-xl rounded-md"
            />
          </div>

          <div className="cover absolute w-full bg-black/10 h-full"></div>

          <div className="absolute text-white top-2 w-sm px-3 py-2 upper-glass flex flex-row items-center justify-between rounded-full bg-white/20 backdrop-blur-md">
            <h6 className="font-extrabold font-michroma">POPULAR</h6>
            <p className="font-light font-michroma">TOP RANKING</p>
          </div>

          <div className="lower-glass absolute bottom-2 flex flex-row items-center justify-between w-sm rounded-full px-4 py-3 bg-white/20 backdrop-blur-md">
            <div className="lower-left flex flex-row gap-2">
              <div className="w-12 rounded-full">
                <img src="nida.jpg" alt="nida" className="rounded-full" />
              </div>

              <div className="lower-left-right font-unbounded text-white">
                <div className="text flex gap-1 text-base font-normal">
                  <h6>Bejing Bot</h6>
                  <span className="text-action-btn-green"> #01</span>
                </div>
                <div className="flex gap-1 text-xs font-light">
                  <p>by</p>
                  <span className="text-action-btn-green">Nida</span>
                </div>
              </div>
            </div>

            <div className="lower-right">
              <h6 className="font-bold text-base">1.2 ETH</h6>
              <p className="font-light text-xs">$ 5307.59</p>
            </div>
          </div>
        </div>

        {/* =============================== RIGHT ========================================= */}
        <div className="right">
          <h1 id="hero-heading" className="font-michroma text-5xl text-white ">
            THE FUTURE OF DIGITAL ART IS
            <span className="text-action-btn-green"> NFTS</span>
          </h1>

          <p className="text-paragraph text-2xl mt-5">
            Buy and sell you NFT even the entire
          </p>
          <span className="text-paragraph text-2xl"> collection</span>

          <div className="mt-5 flex gap-5">
            <button className="bg-action-btn-green text-2xl rounded-full py-4 px-16 cursor-pointer">
              EXPLORE
            </button>
            <button className="bg-white text-2xl rounded-full py-4 px-14 cursor-pointer">
              SELL
            </button>
          </div>

          <div id="line" className="mt-3 w-full"></div>

          <div
            id="card"
            className="flex flex-row mt-4 pt-3 px-4 pb-3 overflow-hidden rounded-md"
          >
            <div className="relative w-32">
              <div className="absolute top-0 w-full overflow-hidden">
                <img
                  src="richLama.jpg"
                  alt="image"
                  className="w-full object-cover rounded-md opacity-80"
                />
              </div>
            </div>

            <div className="w-full rounded-md ml-4 font-unbounded">
              <div className="top">
                <h6 className="font-normal text-white text-sm">
                  RICH LME GUANICOE
                </h6>
                <p className="text-paragraph text-xs font-light mt-1 mb-2">
                  One of the most sold assets collection
                </p>
              </div>

              <div className="flex flex-row items-end justify-between border-t border-t-gray-700">
                <div className="left">
                  <p className="text-xs font-medium text-gray-500 my-2">
                    Entire collection worth
                  </p>
                  <h6 className="font-bold text-xl text-white">225 ETH</h6>
                  <p className="text-sm text-white font-normal">$995,172.50</p>
                </div>

                <div className="right flex">
                  <button className="bg-action-btn-green px-10 py-2 rounded-full text-black font-ligh">
                    BUY ONE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
