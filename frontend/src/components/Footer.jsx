import { Copy } from "lucide-react";

import {
  SiFacebook,
  SiX,
  SiLinkedin,
  SiDiscord,
  SiGmail,
  SiTwitch,
} from "react-icons/si";

const Footer = () => {
  return (
    <>
      <div className="footer flex bg-black  text-white px-12 py-6 w-full ">
        <div className="left font-unbounded ">
          <h1 className="text-action-btn-green text-2xl font-medium">
            BUYING <span className="text-white">POLICY</span>{" "}
          </h1>
          <h2 className="text-2xl font-medium mt-2">
            3%
            <br />
            <span className="font-light text-paragraph">
              From the buyer of NFT and Collection
            </span>
          </h2>
        </div>

        <div className="right ml-12 font-michroma font-normal ">
          <div>
            <h1>JOIN THE COMMUNITY</h1>

            <ul className="flex mt-2 gap-6">
              <li>
                <SiFacebook size={20} />
              </li>
              <li>
                <SiX size={20} />
              </li>
              <li>
                <SiDiscord size={20} />
              </li>
              <li>
                <SiGmail size={20} />
              </li>
              <li>
                <SiLinkedin size={20} />
              </li>
              <SiTwitch size={20} />
            </ul>
          </div>
          <div className="mt-4 font-unbounded">
            <h1 className="text-action-btn-green">
              DONATE
              <span className="text-white"> ETH</span>
            </h1>
            <div className=" p-2 bg-white/10 backdrop-blur-md rounded-sm flex flex-row gap-3 items-center justify-between cursor-pointer">
              <p className="text-xs text-paragraph font-light">
                0x9F2bC7d8A3E5F0a1C6b4D72E3f9A8cD1eFb4A7C2
              </p>
              <div>
                <Copy strokeWidth={0.6} size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
