import { useEffect, useState, useCallback } from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";

const useAuthenticate = () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const { address, isConnected } = useAppKitAccount();

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);

  const Authenticate = useCallback(async () => {
    try {
      if (!isConnected) {
        setError("Wallet not connected");
        return;
      }
      if (!walletProvider) {
        setError("Provider not available");
        return;
      }

      const provider = new ethers.BrowserProvider(walletProvider);

      if (!provider) {
        setError("Provider not available");
      }
      const signer = await provider.getSigner();

      if (!signer) {
        setError("Signer not available");
      }
      setProvider(provider);
      setSigner(signer);
      setError(null);
    } catch (err) {
      console.error("Authentication failed:", err);
      setError(err.message || "Unknown error");
    }
  }, [isConnected, walletProvider]);

  useEffect(() => {
    Authenticate();
  }, [Authenticate]);

  return { error, signer, isConnected, provider, address };
};

export default useAuthenticate;
