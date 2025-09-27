import { Interface } from "ethers";
import NFTsCollectionABI from "../../../artifacts/onchain/NFTsCollection.sol/NFTsCollection.json";

const decodeCollectionRevert = (error) => {
  if (!error?.data) {
    return { name: null, args: [], selector: null, raw: null };
  }

  const raw = error.data;
  const selector = raw.slice(0, 10);

  try {
    const iface = new Interface(NFTsCollectionABI.abi);
    const decoded = iface.parseError(raw);
    return {
      name: decoded.name,
      args: decoded.args,
      selector,
      raw,
    };
  } catch (e) {
    console.error("Could not decode error:", e);
    return {
      name: "UnknownCustomError",
      args: [raw.slice(10)],
      selector,
      raw,
    };
  }
};

export default decodeCollectionRevert;
