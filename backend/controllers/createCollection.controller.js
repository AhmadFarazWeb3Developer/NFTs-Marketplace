import CollectionModel from "../models/collection.model.js";

const createCollection = async (req, res) => {
  try {
    const { accountAddress, collectionAddress, name, symbol } = req.body;

    const image = req.file;

    console.log(image);

    if (!accountAddress || !collectionAddress || !name || !symbol || !image) {
      return res.status(400).json({
        error:
          "account address, contract address, name, symbol and image are required",
      });
    }

    const newCollection = new CollectionModel({
      accountAddress,
      collectionAddress,
      name,
      symbol,
      image: image.path,
    });
    const savedCollection = await newCollection.save();
    console.log("Collection saved to database:", savedCollection);

    res.status(201).json({
      message: "Collection created",
      data: {
        accountAddress,
        collectionAddress,
        name,
        symbol,
        image: image.path,
      },
    });
  } catch (error) {
    console.error("Error in createCollection:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
      details: error,
    });
  }
};

export default createCollection;
