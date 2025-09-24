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
};
