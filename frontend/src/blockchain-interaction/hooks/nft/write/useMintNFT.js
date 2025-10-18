import { ethers } from "ethers";
import useAuthenticate from "../../../helpers/Auth";
import decodeCollectionRevert from "../../../helpers/decodeCollectionRevert";
import { useState } from "react";

const useMintNFT = () => {
  const { error: authError } = useAuthenticate();
  const [IsError, setError] = useState("");
  const [IsSuccess, setSuccess] = useState(false);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mintNFTOnChain = async (collectionInstance, tokenPrice, tokenURI) => {
    if (authError) throw new Error("Authentication error: " + authError);
    if (!collectionInstance)
      throw new Error("Collection contract instance missing");
    if (!tokenURI) throw new Error("Token URI is required");

    try {
      setError("");
      setSuccess(false);
      setEventInfo([]);
      setIsLoading(true);

      const priceInWei = ethers.parseEther(tokenPrice.toString());
      if (!priceInWei || priceInWei <= 0)
        throw new Error("Invalid token price");

      const tx = await collectionInstance.mint(tokenURI, priceInWei);
      const receipt = await tx.wait();

      const events = [];
      for (const log of receipt.logs) {
        try {
          const parsed = collectionInstance.interface.parseLog(log);

          if (parsed.name === "Transfer") {
            events.push({
              event: parsed.name,
              from: parsed.args.from,
              to: parsed.args.to,
              tokenId: parsed.args.tokenId.toString(),
            });
          }

          if (parsed.name === "TokenPriceUpdated") {
            events.push({
              event: parsed.name,
              tokenID: parsed.args.tokenID.toString(),
              oldPrice: parsed.args.oldPrice.toString(),
              newPrice: parsed.args.newPrice.toString(),
            });
          }
          console.log("events : ", events);
        } catch {}
      }

      setEventInfo(events);
      setSuccess(true);
      return { receipt, events };
    } catch (err) {
      const decoded = decodeCollectionRevert(err);
      setError(decoded?.name || "Mint failed");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { mintNFTOnChain, IsError, IsSuccess, eventInfo, isLoading };
};

export default useMintNFT;
