import { ConnectKitButton } from "connectkit";

const CustomConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => {
        return (
          <button
            onClick={show}
            className={`
               bg-action-btn-green text-black px-4 py-2 rounded-full
              font-unbounded text-xs font-medium
              hover:bg-[#aaff4d]  cursor-pointer
              transition-colors duration-200
              border-2 border-transparent hover:border-[#bfff6b]
            `}
          >
            {isConnected
              ? ensName ?? truncatedAddress
              : isConnecting
              ? "Connecting..."
              : "Connect Wallet"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default CustomConnectButton;
