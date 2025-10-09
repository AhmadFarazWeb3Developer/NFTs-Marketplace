import { PinataSDK } from "pinata";
import { useState } from "react";

const pinata = new PinataSDK({
  pinataJwt: "",
  pinataGateway: import.meta.VITE_PINATA_GATEWAY,
});

const useUploadToPinata = () => {
  const [CID, setCID] = useState(null);

  const uploadNftImage = async (file) => {
    console.log("file", file);

    try {
      const cid = await pinata.upload.public.file(file);
      console.log("cid ", cid);

      if (cid) {
        return cid;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadNftImage };
};

export default useUploadToPinata;
