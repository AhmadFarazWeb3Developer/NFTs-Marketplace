import { useAppKitAccount } from "@reown/appkit/react";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import useAuthenticate from "../../../helpers/Auth";
import { ethers } from "ethers";
import { useState } from "react";

const useBuyNFT = () => {
  const { isConnected, address } = useAppKitAccount();
  const { signer } = useAuthenticate();
  const [error, setError] = useState("");

  const buyNFT = async (instance, tokenId, tokenPrice) => {
    console.log("instane : ", instance);
    console.log("token id", tokenId);
    console.log("price ", tokenPrice);

    try {
      if (!isConnected) {
        new Error("wallet is not connected");
      }

      if (address == (await instance.ownerOf(tokenId))) {
        new Error("Cannot send to your self");
      }
      if (!signer) {
        new Error("Signer does not exists");
      }

      const priceInWei = ethers.parseEther(tokenPrice.toString());

      console.log("price in wei ", priceInWei);
      console.log(signer);

      const balance = await signer.provider.getBalance(address);

      if (balance < priceInWei) {
        console.log("Insufficient ETH balance");
        return;
      }

      const tx = await instance.buy(tokenId, {
        value: priceInWei,
      });
      const receipt = await tx.wait();

      console.log("receipt : ", receipt);
    } catch (error) {
      const decoded = decodeCollectionRevert(error);
      console.log(decoded);

      setError(decoded?.name);
    }
  };

  return { buyNFT, error };
};

export default useBuyNFT;
