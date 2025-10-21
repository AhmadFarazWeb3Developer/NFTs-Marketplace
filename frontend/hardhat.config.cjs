require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  defaultNetwork: "polygon_amoy",

  networks: {
    hardhat: {
      blockGasLimit: 30_000_000,
      gas: 12_000_000,
      allowUnlimitedContractSize: true,
      loggingEnabled: true,
      accounts: {
        count: 20,
        accountsBalance: "1000000000000000000000", // 1000 ETH each
      },
    },

    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
  },

  solidity: {
    compilers: [{ version: "0.8.13" }, { version: "0.8.20" }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  paths: {
    sources: "./onchain",
    artifacts: "./artifacts",
    cache: "./cache",
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_AMOY_API_KEY,
  },
};

// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js  --network localhost

// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network polygon_amoy

// npx hardhat verify --network polygon_amoy 0x460815F621C1CE8b2aDC8Db3f4042Bb564210E6A
