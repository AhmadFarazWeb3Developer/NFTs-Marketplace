require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.13", // for contracts
      },
      {
        version: "0.8.20", // for OpenZeppelin v5.4.0
      },
    ],
  },

  paths: {
    sources: "./onchain",
    artifacts: "./artifacts",
    cache: "./cache",
  },

  networks: {
    hardhat: {
      blockGasLimit: 30000000,
      gas: 12000000,
      allowUnlimitedContractSize: true,
      loggingEnabled: true,
      accounts: {
        count: 20,
        accountsBalance: "1000000000000000000000",
      },
    },
  },
};
