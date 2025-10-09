import { ethers } from "ethers";
import useAuthenticate from "../../../helpers/Auth";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import { useState } from "react";

const useMintNFT = () => {
  const { error: authError } = useAuthenticate();
  const [IsError, setError] = useState("");
  const [IsSuccess, setSuccess] = useState(false);

  const mintNFTOnChain = async (collectionInstance, tokenPrice, tokenURI) => {
    if (authError) {
      throw new Error("Authentication error: " + authError);
    }
    if (!collectionInstance) {
      throw new Error("Collection contract instance missing");
    }
    if (!tokenURI) {
      throw new Error("Token URI is required");
    }

    try {
      const priceInWei = ethers.parseEther(tokenPrice.toString());
      if (!priceInWei || priceInWei <= 0) {
        throw new Error("Invalid token price");
      }

      const tx = await collectionInstance.mint(tokenURI, priceInWei);
      const receipt = await tx.wait();

      if (receipt) {
        setSuccess(true);
      }
      return receipt;
    } catch (err) {
      const decoded = decodeCollectionRevert(err);

      console.log(decoded.name);

      setError(decoded?.name);
    }
  };

  return { mintNFTOnChain, IsError, IsSuccess };
};

export default useMintNFT;
