import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload } from "lucide-react";
import useCreateCollection from "../blockchain-interaction/hooks/useCreateCollection";

const CreateCollection = () => {
  const [formData, setFormData] = useState({
    collectionName: "",
    collectionSymbol: "",
    collectionImage: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const {
    createCollectionOnChain,
    txHash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  } = useCreateCollection();

  const uploadCollectionImage = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit.");
      return;
    }
    if (file) {
      setFormData({ ...formData, collectionImage: file });
      setErrorMessage("");
    }
  };

  const createCollection = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    // Form validation
    if (!formData.collectionName || !formData.collectionSymbol) {
      setErrorMessage("Please fill in both Name and Symbol fields.");
      return;
    }

    try {
      // Step 1: Call the blockchain function to create the collection
      await createCollectionOnChain(
        formData.collectionName,
        formData.collectionSymbol
      );
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      setErrorMessage(
        error.message || "Failed to create collection on blockchain."
      );
    }
  };

  // Step 2: Effect to handle API call after transaction confirmation
  useEffect(() => {
    const sendApiRequest = async () => {
      if (isSuccess && txHash) {
        try {
          const form = new FormData();
          form.append("collectionName", formData.collectionName);
          form.append("collectionSymbol", formData.collectionSymbol);
          if (formData.collectionImage) {
            form.append("collectionImage", formData.collectionImage);
          }

          const response = await fetch(
            "http://localhost:3000/api/v1/add-create-collection",
            {
              method: "POST",
              body: form,
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          console.log("Server Response:", data);
          console.log("Transaction Success:", isSuccess);
        } catch (error) {
          console.error("Error sending API request:", error);
          setErrorMessage("Failed to save collection to server.");
        }
      }
    };

    sendApiRequest();
  }, [isSuccess, txHash, formData]);

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
              value={formData.collectionName}
              onChange={(e) =>
                setFormData({ ...formData, collectionName: e.target.value })
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
              value={formData.collectionSymbol}
              onChange={(e) =>
                setFormData({ ...formData, collectionSymbol: e.target.value })
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
              disabled={isPending || isConfirming}
            >
              {isPending || isConfirming ? "Processing..." : "CREATE"}
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
