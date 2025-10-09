import React, { useEffect, useState } from "react";
import useUpdateSaleStatus from "../blockchain-interaction/hooks/nft/write/useUpdateSaleStatus";
import { ToastContainer, toast } from "react-toastify";
import UpdateNFTSaleStatusToast from "../components/toasts/UpdateNFTSaleStatusToast";

const UpdateNFTSaleStatus = ({ collectionInstance }) => {
  const [tokenId, setTokenId] = useState("");
  const [forSale, setForSale] = useState("false");
  const [isPending, setIsPending] = useState(false);

  const { updateSaleStatus, error } = useUpdateSaleStatus();

  const handleClick = async () => {
    setIsPending(true);
    try {
      const saleStatusBool = forSale === "true";

      const { txHash, eventInfo } = await updateSaleStatus(
        collectionInstance,
        tokenId,
        saleStatusBool
      );

      if (txHash) {
        toast(<UpdateNFTSaleStatusToast eventInfo={eventInfo} />, {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          toastClassName:
            "!w-full !max-w-[100vw] !min-w-[600px] mx-auto whitespace-nowrap overflow-x-auto !important",
          style: { width: "150w", maxWidth: "50vw", minWidth: "600px" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-primary-black border border-gray-700 rounded-2xl p-6 w-[380px] sm:w-[420px] text-white font-unbounded">
        <h2 className="text-lg font-semibold text-action-btn-green text-center mb-4">
          Update NFT Sale Status
        </h2>
        <label className="block text-sm text-paragraph mb-2">Token ID</label>
        <input
          type="number"
          placeholder="Enter Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="w-full p-3 mb-4 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-action-btn-green outline-none"
        />
        <label className="block text-sm text-paragraph mb-2">For Sale</label>
        <select
          value={forSale}
          onChange={(e) => setForSale(e.target.value)}
          className="w-full p-3 mb-5 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-action-btn-green outline-none"
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <button
          onClick={handleClick}
          className="w-full bg-action-btn-green text-black py-3 rounded-lg font-medium hover:bg-action-btn-green/80 transition-all disabled:opacity-50 cursor-pointer"
          disabled={isPending} // disable button while pending
        >
          {isPending ? "Updating..." : "Update Status"}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="!w-full !min-w-[50vw]"
          style={{ width: "50%", maxWidth: "50%" }}
        />
      </div>
    </div>
  );
};

export default UpdateNFTSaleStatus;
