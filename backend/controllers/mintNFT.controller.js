import { PinataSDK } from "pinata";
import dotenv from "dotenv";

dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const mintNFT = async (req, res) => {
  try {
    const { nftPrice } = req.body;
    const nftImage = req.file;

    if (!nftImage) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const blob = new Blob([nftImage.buffer], { type: nftImage.mimetype });

    const uploadResult = await pinata.upload.public.file(blob, {
      name: nftImage.originalname,
    });

    const cid = uploadResult.cid;
    const gatewayUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${cid}`;

    res.status(201).json({
      message: "NFT uploaded to IPFS successfully",
      data: { nftPrice, cid, gatewayUrl },
    });
  } catch (error) {
    console.error("Error in mintNFT:", error);
    res.status(500).json({ error: error.message });
  }
};

export default mintNFT;
