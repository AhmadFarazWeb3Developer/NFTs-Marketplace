import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload } from "lucide-react";
import useCreateCollection from "../blockchain-interaction/hooks/collection/write/useCreateCollection";
import { useAppKitAccount } from "@reown/appkit/react";

const CreateCollection = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { address } = useAppKitAccount();

  const {
    createCollectionOnChain,
    txHash,
    isPending,
    isSuccess,
    isError,
    error,
    contractAddress,
    accountAddress,
  } = useCreateCollection();

  const uploadCollectionImage = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit.");
      return;
    }
    if (file) {
      setFormData({ ...formData, image: file });
      setErrorMessage("");
    }
  };

  const createCollection = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.symbol) {
      setErrorMessage("Please fill in both Name and Symbol fields.");
      return;
    }

    if (!address) {
      setErrorMessage("Wallet not connected");
      return;
    }

    try {
      await createCollectionOnChain(formData.name, formData.symbol);
    } catch (err) {
      setErrorMessage(err.message || "Failed to create collection.");
    }
  };

  useEffect(() => {
    const sendApiRequest = async () => {
      if (isSuccess && txHash && contractAddress && accountAddress) {
        try {
          const form = new FormData();

          form.append("accountAddress", accountAddress);
          form.append("contractAddress", contractAddress);
          form.append("name", formData.name);
          form.append("symbol", formData.symbol);

          if (formData.image) {
            form.append("image", formData.image);
          }

          const response = await fetch(
            "http://localhost:3000/api/v1/add-create-collection",
            {
              method: "POST",
              body: form,
            }
          );

          if (!response.ok) throw new Error("API request failed");

          const data = await response.json();

          console.log("Server Response:", data);
          console.log("Transaction Success:", isSuccess);
        } catch (err) {
          console.error("Error sending API request:", err);
          setErrorMessage("Failed to save collection to server.");
        }
      }
    };

    sendApiRequest();
  }, [isSuccess, txHash, contractAddress, accountAddress]);

  return (
    <>
      <Navbar />
      <div className="create-collection flex w-full justify-center items-center gap-10 flex-col bg-primary-black px-10 py-8 font-unbounded text-white">
        <h1 className="text-action-btn-green font-semibold text-2xl">
          CREATE <span className="text-white">COLLECTION</span>
        </h1>

        <form
          onSubmit={createCollection}
          className="border-1 border-paragraph/60 rounded-md px-10 w-1/2 flex flex-col gap-6 py-10"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="collectionName" className="font-light">
              Name
            </label>
            <input
              type="text"
              placeholder="Board Apes etc."
              className="w-full border border-paragraph/70 px-2 py-2 rounded-sm focus:border-action-btn-green"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="collectionSymbol" className="font-light">
              Symbol
            </label>
            <input
              type="text"
              placeholder="BA etc"
              className="w-full border border-paragraph/70 px-2 py-2 rounded-md"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
            />
          </div>

          <div className="w-full rounded-md border border-paragraph/50 p-6 flex flex-col items-center justify-center gap-3 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={uploadCollectionImage}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-action-btn-green/20 hover:bg-action-btn-green/30 transition-colors">
                <Upload className="w-8 h-8 text-action-btn-green" />
              </div>
              <p className="mt-2 text-sm font-medium text-paragraph">
                Upload Image
              </p>
              <p className="text-xs text-paragraph/70">PNG, JPG up to 5MB</p>
            </label>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <button
              type="submit"
              className="w-full bg-action-btn-green py-2 rounded-sm text-black cursor-pointer disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "CREATE"}
            </button>
            <span className="font-extralight text-xs text-red-600/90">
              *Note: Name and Symbol cannot be changed in future
            </span>
          </div>
        </form>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}
        {isSuccess && (
          <p className="text-green-500">Collection created successfully!</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CreateCollection;
