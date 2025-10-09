import { Router } from "express";
import mintNFT from "../controllers/mintNFT.controller.js";
import multer from "multer";

const NFTRouter = Router();
const uploadNftImage = multer({ storage: multer.memoryStorage() });

NFTRouter.post("/add-mint-nft", uploadNftImage.single("nftImage"), mintNFT);

export default NFTRouter;
