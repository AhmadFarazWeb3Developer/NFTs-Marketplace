import { useReadContract } from "wagmi";
import deployment from "../../../contracts/broadcast/NftsMarketPlace.s.sol/31337/run-latest.json";
import abi from "../../../contracts/out/NFTsMarketplaceFactory.sol/NFTsMarketplaceFactory.json";
import { localhost } from "wagmi/chains";

const contractAddress = deployment.transactions[0].contractAddress;

const useReadContractInstance = (functionName, args = []) => {
  return useReadContract({
    address: contractAddress,
    abi: abi.abi,
    functionName,
    args,
    chainId: 31337,
  });
};

export default useReadContractInstance;
