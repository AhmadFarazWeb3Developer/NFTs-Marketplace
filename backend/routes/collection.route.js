import { Router } from "express";
import createCollection from "../controllers/createCollection.controller.js";
import multer from "multer";
import getCollection from "../controllers/getCollection.controller.js";

const CollectionRouter = Router();

const uploadCollectionImage = multer({ dest: "uploads/collections" });

CollectionRouter.post(
  "/add-create-collection",
  uploadCollectionImage.single("image"),
  createCollection
);

CollectionRouter.get("/collection", getCollection);

export default CollectionRouter;
