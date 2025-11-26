require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  defaultNetwork: "hardhat",
  // defaultNetwork: "polygon_amoy",
  // defaultNetwork: "bsc_testnet",
  // defaultNetwork: "arbitrum_sepolia",
  // defaultNetwork: "avalanche_fuji",

  networks: {
    localhost: {
      allowUnlimitedContractSize: true,
      gas: 30_000_000,
      blockGasLimit: 30_000_000,
    },

    hardhat: {
      blockGasLimit: 30_000_000,
      gas: 30_000_000,
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
      url: `https://bnb-testnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },

    arbitrum_sepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 421614,
    },

    avalanche_fuji: {
      url: `https://avax-fuji.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113,
    },
    optimism_sepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155420,
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
// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network arbitrum_sepolia
// npx hardhat ignition deploy ./ignition/modules/NFTsMarketplaceFactory.js --network avalanche_fuji

// npx hardhat verify --network  avalanche_fuji 0xa717002347fb5d897038aD347c8c25a1fB414f22
