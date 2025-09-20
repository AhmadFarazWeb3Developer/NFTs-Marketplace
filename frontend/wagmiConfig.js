import { createConfig, http } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

const localAnvil = { ...localhost, id: 31337 };

const wagmiConfig = createConfig({
  autoConnect: true, // optional, but helps
  chains: [localhost, sepolia],
  transports: {
    [localAnvil.id]: http("http://127.0.0.1:8545"), // must include http://
    [sepolia.id]: http(), // optional
  },
});

export default wagmiConfig;
