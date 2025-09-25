import { ethers } from "ethers";
import { tokenURI } from "../../../helpers/IPFS";
import useAuthenticate from "../../../helpers/Auth";

const useMintNFT = () => {
  const { error, signer } = useAuthenticate();

  const mintNFTOnChain = async (collectionAddress, tokenPrice) => {
    if (error) {
      console.log(error);

      return;
    }

    const result = await collectionAddress.mint(tokenURI, tokenPrice); // tokenURL and token price

    await result.wait();
  };

  return mintNFTOnChain;
};

export default useMintNFT;
