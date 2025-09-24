import deployment from "../../../ignition/deployments/chain-31337/deployed_addresses.json";
import abi from "../../../artifacts/onchain/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const useConstants = () => {
  const contractAddress =
    deployment["NFTsMarketplaceFactoryModule#NFTsMarketplaceFactory"];

  const contractABI = abi.abi;

  const hardhatChainId = 31337;

  return { contractAddress, contractABI, hardhatChainId };
};

export default useConstants;
