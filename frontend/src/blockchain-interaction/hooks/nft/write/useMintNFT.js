import { ethers } from "ethers";
import useAuthenticate from "../../../helpers/Auth";

import { tokenURI } from "../../../helpers/IPFS";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import { useState } from "react";

const useMintNFT = () => {
  const { error } = useAuthenticate();

  const [IsError, setError] = useState("");
  const [IsSuccess, setSuccess] = useState(false);

  const mintNFTOnChain = async (collectionInstance, tokenPrice) => {
    console.log(collectionInstance);
    console.log(tokenPrice);

    if (error) {
      console.log(error);
      throw new Error("Authentication error: " + error);
    }

    if (!collectionInstance) {
      throw new Error("Collection instance is null or undefined");
    }

    if (!tokenURI) {
      throw new Error("Token URI is required");
    }

    console.log("minting with params:", { tokenURI, tokenPrice });

    try {
      const priceInWei = ethers.parseEther(tokenPrice.toString());
      if (!priceInWei || priceInWei <= 0) {
        throw new Error("Invalid token price");
      }

      const tx = await collectionInstance.mint(tokenURI, priceInWei);

      const receipt = await tx.wait();

      const tokenId = await collectionInstance.tokenId();

      if (receipt) {
        setSuccess(true);
      }
      return receipt;
    } catch (err) {
      const decode = decodeCollectionRevert();
      setError(decode.name);
    }
  };

  return { mintNFTOnChain, IsError, IsSuccess };
};

export default useMintNFT;
