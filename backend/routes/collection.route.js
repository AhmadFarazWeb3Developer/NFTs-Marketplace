import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import createCollection from "../controllers/createCollection.controller.js";
import getCollection from "../controllers/getCollection.controller.js";
import updateCollectionOwner from "../controllers/updateCollectionOwner.controller.js.js";

const CollectionRouter = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "NFT-collections",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const uploadCollectionImage = multer({ storage });

CollectionRouter.post(
  "/add-create-collection",
  uploadCollectionImage.single("image"),
  createCollection
);

CollectionRouter.get("/collection", getCollection);
console.log("put router called : ");
CollectionRouter.put("/update-owner", updateCollectionOwner);

export default CollectionRouter;
