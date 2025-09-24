// import deployment from "../../../ignition/deployments/localhost/NFTsMarketplaceFactoryModule.json";
import abi from "../../../artifacts/contracts/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

import hr from "hardhat";

const { ether } = hr;

const useConstants = () => {
  const contractAddress = deployment.contracts.NFTsMarketplaceFactory.address;

  const contractABI = abi.abi;

  const hardhatChainId = 31337;

  return { contractAddress, contractABI, hardhatChainId };
};

export default useConstants;
