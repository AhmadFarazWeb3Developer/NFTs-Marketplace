import { ethers } from "ethers";
import useAuthenticate from "../../../helpers/Auth";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import { useState } from "react";

const useMintNFT = () => {
  const { error: authError } = useAuthenticate();
  const [IsError, setError] = useState("");
  const [IsSuccess, setSuccess] = useState(false);

  const mintNFTOnChain = async (collectionInstance, tokenPrice, tokenURI) => {
    if (authError) throw new Error("Authentication error: " + authError);
    if (!collectionInstance)
      throw new Error("Collection contract instance missing");
    if (!tokenURI) throw new Error("Token URI is required");

    try {
      const priceInWei = ethers.parseEther(tokenPrice.toString());
      if (!priceInWei || priceInWei <= 0)
        throw new Error("Invalid token price");

      const tx = await collectionInstance.mint(tokenURI, priceInWei);
      const receipt = await tx.wait();

      if (receipt) {
        setSuccess(true);
        // Reset after short delay to avoid double toasts on re-render
        setTimeout(() => setSuccess(false), 200);
      }
      return receipt;
    } catch (err) {
      const decoded = decodeCollectionRevert(err);
      setError(decoded?.name || "Mint failed");
      // Reset too
      setTimeout(() => setError(""), 200);
    }
  };

  return { mintNFTOnChain, IsError, IsSuccess };
};

export default useMintNFT;
