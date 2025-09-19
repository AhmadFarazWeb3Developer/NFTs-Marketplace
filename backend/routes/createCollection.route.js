import { Router } from "express";
import createCollection from "../controllers/createCollection.controller.js";

const createCollectionRouter = Router();

// createCollectionRouter.get("/create-collection");

createCollectionRouter.post("/store-collection", createCollection);

export default createCollectionRouter;
