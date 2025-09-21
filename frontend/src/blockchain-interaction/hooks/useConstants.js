import deployment from "../../../contracts/broadcast/NftsMarketPlace.s.sol/31337/run-latest.json";
import abi from "../../../contracts/out/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const useConstants = () => {
  const contractAddress = deployment.transactions[0].contractAddress;
  const contractABI = abi.abi;
  const anvilChainId = 31337;

  return { contractAddress, contractABI, anvilChainId };
};

export default useConstants;
