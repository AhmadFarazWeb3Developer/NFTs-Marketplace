const mintNFT = (req, res) => {
  try {
    const { nftPrice } = req.body;
    const nftImage = req.file;

    if (!nftPrice) {
      return res.status(400).json({ error: "Name Price is required" });
    }

    res.status(201).json({
      message: "NFT Minted",
      data: {
        nftPrice,
        nftImage: nftImage ? nftImage.filename : "No NFT image uploaded",
      },
    });
  } catch (error) {
    console.error("Error in nftMint:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default mintNFT;
