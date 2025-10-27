// import deployment from "../../../ignition/deployments/chain-31337/deployed_addresses.json";
// import NFTsMarketplaceFactoryABI from "../../../artifacts/onchain/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

// import deployment from "../../../ignition/deployments/chain-80002/deployed_addresses.json";
// import NFTsMarketplaceFactoryABI from "../../../artifacts/onchain/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";
import deployment from "../../../ignition/deployments/chain-43113/deployed_addresses.json";
import NFTsMarketplaceFactoryABI from "../../../artifacts/onchain/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const useConstants = () => {
  const factoryAddress =
    deployment["NFTsMarketplaceFactoryModule#NFTsMarketplaceFactory"];

  const factoryABI = NFTsMarketplaceFactoryABI.abi;

  return { factoryAddress, factoryABI };
};

export default useConstants;

/*
npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js  --network localhost
npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network polygon_amoy

*/
