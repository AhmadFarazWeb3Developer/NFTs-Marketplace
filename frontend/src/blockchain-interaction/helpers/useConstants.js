import deployment from "../../../ignition/deployments/chain-31337/deployed_addresses.json";
import NFTsMarketplaceFactoryABI from "../../../artifacts/onchain/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const useConstants = () => {
  const factoryAddress =
    deployment["NFTsMarketplaceFactoryModule#NFTsMarketplaceFactory"];

  const factoryABI = NFTsMarketplaceFactoryABI.abi;

  const hardhatChainId = 31337;

  return { factoryAddress, factoryABI, hardhatChainId };
};

export default useConstants;

/*
npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js  --network localhost
*/
