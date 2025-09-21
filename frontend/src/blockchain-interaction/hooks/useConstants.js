import deployment from "../../../contracts/broadcast/NFTsMarketplace.s.sol/31337/run-latest.json";
import abi from "../../../contracts/out/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";

const useConstants = () => {
  const contractAddress = deployment.transactions[0].contractAddress;
  const contractABI = abi.abi;
  const anvilChainId = 31337;

  return { contractAddress, contractABI, anvilChainId };
};

export default useConstants;

// forge script script/NFTsMarketplace.s.sol:NFTsMarketplace --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

// cast send 0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9 "createCollection(string,string)" "MyNFT" "MNFT"  --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
