import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Upload } from "lucide-react";

const CreateCollection = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    image: null,
  });

  const uploadCollectionImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const createCollection = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("symbol", formData.symbol);
      if (formData.image) {
        form.append("image", formData.image); // Use file object, not file name
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/add-create-collection",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-collection flex w-full justify-center items-center gap-10 flex-col bg-primary-black px-10 py-8 font-unbounded text-white">
        <h1 className="text-action-btn-green font-semibold text-2xl ">
          CREATE <span className="text-white">COLLECTION</span>
        </h1>

        <form
          action=""
          onSubmit={createCollection}
          className="border-1 border-paragraph/60 rounded-md px-10  w-1/2 flex flex-col gap-6 py-10"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="font-light ">
              Name
            </label>
            <input
              type="text"
              placeholder="Board Apes etc."
              className="w-full border border-paragraph/70 px-2 py-2 rounded-sm focus:border-action-btn-green"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="font-light">
              Symbol
            </label>
            <input
              type="text"
              placeholder="BA etc"
              className="w-full border border-paragraph/70 px-2 py-2 rounded-md"
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
              <div className=" flex items-center justify-center w-16 h-16 rounded-full bg-action-btn-green/20 hover:bg-action-btn-green/30 transition-colors">
                <Upload className="w-8 h-8 text-action-btn-green" />
              </div>
              <p className="mt-2 text-sm font-medium text-paragraph">
                Upload Image
              </p>
              <p className="text-xs text-paragraph/70">PNG, JPG up to 5MB</p>
            </label>
          </div>
          <div
            className="flex flex-col gap-2 w-full
          "
          >
            <button className="w-full bg-action-btn-green py-2  rounded-sm text-black cursor-pointer">
              CREATE
            </button>
            <span className=" font-extralight text-xs  text-red-600/90">
              *Note: Name and Symbol cannot be changed in future
            </span>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateCollection;
