import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCircleFill } from "react-icons/bs";
const NftCard = ({
  tokenURI,
  name,
  symbol,
  tokenId,
  tokenPrice,
  owner,
  isForSale,
  collectionInstance,
  collectionImage,
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
        className="collection-card border-b border-gray-700 hover:bg-white/5 cursor-pointer text-xs"
        onClick={() =>
          navigateTo(`/explore/buyNft/${tokenId}`, {
            state: {
              tokenId,
              tokenPrice,
              collectionAddress: collectionInstance.collectionAddress,
              NFTImage: tokenURI,
              collectionImage,
            },
          })
        }
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
        <td className="px-2 py-3">{tokenId}</td>
        <td className="px-2 py-3">
          {tokenPrice} <span className="text-paragraph/50">ETH</span>
        </td>

        <td className="px-2 py-3">{trimmedOwner}</td>

        <td className="px-2 py-3">
          <div className="flex items-center gap-2">
            <BsCircleFill
              size={6}
              className={`text-xs ${
                isForSale ? "text-green-500" : "text-red-400"
              }`}
            />
            <span className="text-paragraph/70 font-light">
              {isForSale ? "For Sale" : "Not For Sale"}
            </span>
          </div>
        </td>
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
