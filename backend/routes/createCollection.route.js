import { Router } from "express";
import createCollection from "../controllers/createCollection.controller.js";
import multer from "multer";

const createCollectionRouter = Router();

const uploadCollectionImage = multer({ dest: "uploads/collections" });

createCollectionRouter.post(
  "/add-create-collection",
  uploadCollectionImage.single("image"),
  createCollection
);

export default createCollectionRouter;
