import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCollectionStatus = ({ factoryReadInstance }) => {
  if (!factoryReadInstance) return null;

  const [collectionId, setCollectionId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [forSale, setForSale] = useState("false");
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async () => {
    if (!collectionId || newPrice === "") {
      toast.error("Please enter Collection ID and Price");
      return;
    }

    setIsPending(true);
    try {
      const forSaleBool = forSale === "true";
      const tx = await factoryReadInstance.UpdateCollectionStatus(
        collectionId,
        newPrice,
        forSaleBool
      );
      await tx.wait();

      toast.success(`Collection ${collectionId} updated successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center px-4 my-4">
      <div className="bg-primary-black border border-gray-700 rounded-2xl p-6 w-[380px] sm:w-[420px] text-white font-unbounded">
        <h2 className="text-lg font-semibold text-action-btn-green text-center mb-4">
          Update Collection Status
        </h2>

        <label className="block text-sm text-paragraph mb-2">
          Collection ID
        </label>
        <input
          type="number"
          placeholder="Enter Collection ID"
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          className="w-full p-3 mb-4 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-action-btn-green outline-none"
        />

        <label className="block text-sm text-paragraph mb-2">
          New Price (ETH)
        </label>
        <input
          type="number"
          placeholder="Enter New Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
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
          onClick={handleUpdate}
          disabled={isPending}
          className="w-full bg-action-btn-green text-black py-3 rounded-lg font-medium hover:bg-action-btn-green/80 transition-all disabled:opacity-50 cursor-pointer"
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

export default UpdateCollectionStatus;
