import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { ethers } from "ethers";
import { Wallet, ChevronDown } from "lucide-react";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitNetwork,
  useAppKitState,
} from "@reown/appkit/react";

import { getNetworkToken } from "../blockchain-interaction/helpers/getNetworkToken";

const Navbar = () => {
  const navigateTo = useNavigate();

  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, chainId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("eip155");
  const { open: isModalOpen } = useAppKitState();

  const [balance, setBalance] = useState("0.00");
  const [nativeToken, setNativeToken] = useState({
    symbol: "ETH",
    name: "Ether",
  });
  const [previousChainId, setPreviousChainId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close modal when network changes
  useEffect(() => {
    if (
      previousChainId !== null &&
      previousChainId !== chainId &&
      isModalOpen
    ) {
      close();
    }
    setPreviousChainId(chainId);
  }, [chainId, isModalOpen, close, previousChainId]);

  useEffect(() => {
    if (chainId) {
      const token = getNetworkToken(chainId);
      setNativeToken(token);
    }
  }, [chainId]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && address && walletProvider) {
        try {
          const provider = new ethers.BrowserProvider(walletProvider);
          const balanceWei = await provider.getBalance(address);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(parseFloat(balanceEth).toFixed(4));
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance("0.00");
        }
      }
    };

    fetchBalance();
  }, [isConnected, address, chainId, walletProvider]);

  useEffect(() => {
    setImageLoaded(false);
  }, [chainId, caipNetwork]);

  const getNetworkImageUrl = () => {
    if (!chainId) return null;

    const chainMap = {
      1: "ethereum",
      137: "polygon",
      56: "smartchain",
      42161: "arbitrum",
      10: "optimism",
      43114: "avalanchec",
      8453: "base",
      250: "fantom",
      100: "xdai",
      11155111: "ethereum",
      80002: "polygon",
      97: "smartchain",
      421614: "arbitrum",
      43113: "avalanchec",
      11155420: "optimism",
      84532: "base",
      31337: "ethereum",
    };

    const chainName = chainMap[chainId];
    if (chainName) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/info/logo.png`;
    }

    return null;
  };

  const networkImageUrl = getNetworkImageUrl();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="navbar flex justify-between items-center text-white flex-row py-4 px-10 bg-dark-black font-unbounded tracking-wide">
      <div className="logo font-bold">
        <h2 className="font-medium text-xs font-unbounded">Dream NFTs</h2>
      </div>

      <ul className="flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
        <Link to="/create-collection">
          <li className="cursor-pointer">CREATE COLLECTION</li>
        </Link>
        <Link to="/explore">
          <li className="cursor-pointer">EXPLORE</li>
        </Link>
      </ul>

      <div className="flex flex-row items-center gap-3">
        {isConnected ? (
          <div className="flex flex-row items-center gap-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl p-1 shadow-lg cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <div className="rounded-full flex items-center justify-center">
                <Wallet size={18} color="gray" strokeWidth="2px" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/60">{balance}</span>
                <span className="text-xs text-white/60">
                  {nativeToken.symbol}
                </span>
              </div>
            </div>

            {caipNetwork && (
              <button
                onClick={() => open({ view: "Networks" })}
                className="flex items-center gap-2 px-3 py-2 hover:bg-action-btn-green rounded-full group cursor-pointer hover:text-black  transition-all hover:scale-105 "
              >
                {networkImageUrl && (
                  <img
                    src={networkImageUrl}
                    alt={caipNetwork.name || "Network"}
                    className=" w-5 h-5 rounded-full ring-2 ring-white/10  group-hover:ring-action-btn-green/50 transition-all object-cover hover:text-black"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoaded ? "block" : "none" }}
                  />
                )}

                {(!networkImageUrl || !imageLoaded) && (
                  <div className=" w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white/10 group-hover:ring-action-btn-green/50 transition-all hover:text-black">
                    {caipNetwork.name?.charAt(0)?.toUpperCase() || "N"}
                  </div>
                )}

                <span className="text-xs   hover:text-black text-white/80 group-hover:text-white transition-colors ">
                  {caipNetwork.name}
                </span>
                <ChevronDown
                  size={14}
                  className="text-white/60  hover:text-black"
                />
              </button>
            )}

            <button
              onClick={() => open({ view: "Account" })}
              className="flex items-center gap-2 px-5 py-2.5 hover:bg-action-btn-green hover:text-black rounded-full font-normal text-white/70 transition-all hover:scale-105 shadow-2xl cursor-pointer"
            >
              <span className="text-sm">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
              <ChevronDown size={14} className="opacity-100" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => open()}
            className="flex items-center gap-2 px-6 py-2.5 bg-action-btn-green rounded-full text-black shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer font-semibold"
          >
            <Wallet size={18} />
            <span className="text-sm">Connect Wallet</span>
          </button>
        )}

        {isConnected && (
          <LiaUserCircleSolid
            size={32}
            className="text-action-btn-green cursor-pointer"
            onClick={() => navigateTo("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
