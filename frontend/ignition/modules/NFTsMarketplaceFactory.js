import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NFTsMarketplaceFactoryModule", (m) => {
  const NFTsMarketplaceFactory = m.contract("NFTsMarketplaceFactory");

  return { NFTsMarketplaceFactory };
});
