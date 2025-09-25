import { useEffect, useState } from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

const useAuthenticate = async () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const { address, isConnected } = useAppKitAccount();

  const [signer, setSigner] = useState("");
  const [error, setError] = useState("");

  const Authenticate = async () => {
    if (!isConnected) {
      setError("Wallet Not Connected");
    } else if (!walletProvider) {
      setError("Provider Not Exists");
    } else {
      const provider = await ethers.JsonRpcProvider(walletProvider);
      const signer = provider.getSigner();

      setSigner(signer);
    }
  };

  useEffect(() => {
    Authenticate();
  }, [isConnected, walletProvider]);

  return { error, signer, walletProvider };
};
export default useAuthenticate;
