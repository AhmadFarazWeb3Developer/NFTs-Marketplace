require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  // defaultNetwork: "polygon_amoy",
  defaultNetwork: "bsc_testnet",

  networks: {
    hardhat: {
      blockGasLimit: 30_000_000,
      gas: 12_000_000,
      allowUnlimitedContractSize: true,
      loggingEnabled: true,
      accounts: {
        count: 20,
        accountsBalance: "1000000000000000000000",
      },
    },

    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },

    bsc_testnet: {
      url: `https://bnb-testnet.g.alchemy.com/v2/${process.env.VITE_BNB_ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
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
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js  --network localhost
// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network polygon_amoy
// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network bsc_testnet

// npx hardhat verify --network bsc_testnet 0xa717002347fb5d897038aD347c8c25a1fB414f22
