import { ethers } from "ethers";
import useAuthenticate from "../../../helpers/Auth";
import NFTsCollectionABI from "../../../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";
import { tokenURI } from "../../../helpers/IPFS";

const useMintNFT = () => {
  const { error } = useAuthenticate();

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
      // Validate inputs
      const priceInWei = ethers.parseEther(tokenPrice.toString());
      if (!priceInWei || priceInWei <= 0) {
        throw new Error("Invalid token price");
      }

      const tx = await collectionInstance.mint(tokenURI, priceInWei);

      const receipt = await tx.wait();

      const tokenId = await collectionInstance.tokenId();

      console.log("token Id :", tokenId);

      return receipt;
    } catch (err) {
      console.error("Transaction error:", err);

      // Enhanced error decoding
      if (err?.data || err?.error?.data) {
        try {
          const iface = new ethers.Interface(NFTsCollectionABI.abi);
          const errorData = err.data || err.error.data;

          // Handle both hex string and object formats
          const errorHex =
            typeof errorData === "string"
              ? errorData
              : errorData?.data || errorData;

          if (errorHex && errorHex !== "0x") {
            const decoded = iface.parseError(errorHex);
            console.error("Decoded custom error:", decoded);
            throw new Error(`Smart contract error: ${decoded.name}`);
          }
        } catch (decodeErr) {
          console.error("Error decoding failed:", decodeErr);
          // Continue with original error
        }
      }

      // Handle common errors
      if (err.code === "INSUFFICIENT_FUNDS") {
        throw new Error("Insufficient funds for transaction");
      }

      if (err.message?.includes("user rejected")) {
        throw new Error("Transaction rejected by user");
      }

      throw new Error(err.reason || err.message || "Transaction failed");
    }
  };

  return { mintNFTOnChain };
};

export default useMintNFT;
