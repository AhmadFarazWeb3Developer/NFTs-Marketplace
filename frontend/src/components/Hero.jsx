import React from "react";

const Hero = () => {
  return (
    <>
      <div
        className="hero-section "
        class=" flex justify-center  flex-row gap-10 my-10 w-full px-14"
      >
        <div
          className="left"
          class="font-unbounded  flex justify-center  relative rounded-md"
        >
          <div>
            <img
              src="rank1Nft.png"
              alt="Rank 1 NFT"
              class="w-2xl h-xl rounded-md "
            />
          </div>

          <div
            className="cover"
            class="absolute w-full bg-black/10 h-full"
          ></div>
          <div className=" absolute  text-white top-2  w-sm  px-3 py-2 upper-glass flex flex-row items-center justify-between rounded-full bg-white/20 backdrop-blur-md">
            <h6 class=" font-extrabold">POPULAR</h6>
            <p class=" font-light">TOP RANKING</p>
          </div>

          <div
            className="lower-glass"
            class="absolute bottom-2 flex flex-row  items-center justify-between  w-sm rounded-full px-4 py-3 bg-white/20 backdrop-blur-md"
          >
            <div className="lower-left" class="flex flex-row gap-2 ">
              <div className="" class=" w-12  rounded-full">
                <img src="nida.jpg" alt="nida" class="rounded-full" />
              </div>

              <div className="lower-left-right font-unbounded text-white">
                <div className="" class="text flex gap-1 text-base font-normal">
                  <h6>Bejing Bot</h6>
                  <span class="text-action-btn-green"> #01</span>
                </div>
                <div class="flex gap-1 text-xs font-light">
                  <p>by</p>
                  <span class="text-action-btn-green">Nida</span>
                </div>
              </div>
            </div>

            <div className="lower-right">
              <h6 class="font-bold text-base">1.2 ETH</h6>
              <p class="font-light text-xs">$ 5307.59</p>
            </div>
          </div>
        </div>

        {/* =============================== RIGHT ========================================= */}

        <div className="right" class="">
          <h1 id="hero-heading" class="font-michroma text-5xl text-white">
            THE FUTURE OF DIGITAL ART IS{" "}
            <span class="text-action-btn-green">NFT</span>
          </h1>
          <p class="text-paragraph text-2xl mt-5">
            Buy and sell you NFT even the entire
          </p>
          <span class="text-paragraph text-2xl"> collection</span>

          <div class="mt-5 flex gap-5">
            <button class="bg-action-btn-green text-2xl rounded-full py-4 px-16 cursor-pointer">
              EXPLORE
            </button>
            <button class="bg-white text-2xl rounded-full py-4 px-14 cursor-pointer">
              SELL
            </button>
          </div>

          <div id="line" class="mt-5"></div>

          <div className="border border-indigo-300 flex flex-row mt-5 rounded-md items-start overflow-hidden">
            <div className="relative w-32 h-36 border border-red-400 ">
              <div className="absolute top-0 w-full overflow-hidden">
                <img
                  src="richLama.jpg"
                  alt="image"
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="border border-red-400 w-full rounded-md ml-4">
              {" "}
              {/* Added ml-4 for spacing between left/right */}
              <div className="top px-4">
                {" "}
                {/* Added padding for better layout */}
                <h6 className="font-bold text-lg">RICH LME GUANICOE</h6>{" "}
                {/* Added classes for styling */}
                <p className="text-gray-600">
                  One of the most sold assets collection
                </p>
              </div>
              <div className="bottom px-4 border-t">
                <div className="flex flex-row items-center justify-between">
                  <div className="left">
                    <p className="text-sm text-gray-500">
                      Entire collection worth
                    </p>
                    <h6 className="font-bold text-xl">225 ETH</h6>
                    <p className="text-sm text-gray-600">$995,172.50</p>
                  </div>

                  <div className="right">
                    <button className="bg-[#bfff6b] px-4 py-2 rounded text-black font-semibold">
                      BUY ONE
                    </button>{" "}
                    {/* Used your custom green; added padding */}
                  </div>
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
