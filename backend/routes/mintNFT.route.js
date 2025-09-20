import { Router } from "express";
import mintNFT from "../controllers/mintNFT.controller.js";
import multer from "multer";

const mintNFTRouter = Router();

const uploadNftImage = multer({ dest: "uploads/nfts" });

mintNFTRouter.post("/add-mint-nft", uploadNftImage.single("nftImage"), mintNFT);

export default mintNFTRouter;
