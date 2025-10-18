import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NftCard = ({
  tokenURI,
  name,
  symbol,
  tokenId,
  tokenPrice,
  owner,
  isForSale,
}) => {
  const navigateTo = useNavigate();

  const trimmedOwner = owner
    ? `${owner.slice(0, 6)}...${owner.slice(-4)}`
    : "—";

  const formattedURI = tokenURI
    ? tokenURI.substring(tokenURI.indexOf("https://"))
    : "placeholder.jpg";

  const copyAddress = (address) => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied!");
  };

  return (
    <>
      <tr
        className="collection-card border-b border-gray-700 hover:bg-white/5 cursor-pointer  "
        onClick={() => navigateTo("/explore/buyNft")}
      >
        <td className="px-2 py-3">
          <img
            src={formattedURI}
            alt={name || "NFT"}
            className="w-14 h-14 object-cover rounded-md"
          />
        </td>
        <td className="px-2 py-3">{name || "—"}</td>
        <td className="px-2 py-3">{symbol || "—"}</td>
        <td className="px-2 py-3">{tokenId || "—"}</td>
        <td className="px-2 py-3">{tokenPrice ? `${tokenPrice} ETH` : "—"}</td>
        <td className="px-2 py-3 flex  border-1 gap-2">
          {trimmedOwner}
          {owner && (
            <FaRegCopy
              className="text-white hover:text-action-btn-green cursor-pointer"
              onClick={(e) => {
                // e.stopPropagation();
                copyAddress(owner);
              }}
            />
          )}
        </td>
        <td className="px-2 py-3">{isForSale ? "For Sale" : "Not For Sale"}</td>
      </tr>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </>
  );
};

export default NftCard;
