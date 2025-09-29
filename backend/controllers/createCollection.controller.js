import CollectionModel from "../models/collection.model.js";

const createCollection = async (req, res) => {
  try {
    const { accountAddress, contractAddress, name, symbol } = req.body;

    const image = req.file;

    if (!accountAddress || !contractAddress || !name || !symbol || !image) {
      return res.status(400).json({
        error:
          "account address, contract address, name, symbol and image are required",
      });
    }

    const newCollection = new CollectionModel({
      accountAddress,
      contractAddress,
      name,
      symbol,
      image: image.filename,
    });
    const savedCollection = await newCollection.save();
    console.log("Collection saved to database:", savedCollection);

    res.status(201).json({
      message: "Collection created",
      data: {
        accountAddress,
        contractAddress,
        name,
        symbol,
        image: image ? image.filename : "No image uploaded",
      },
    });
  } catch (error) {
    console.error("Error in createCollection:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default createCollection;
