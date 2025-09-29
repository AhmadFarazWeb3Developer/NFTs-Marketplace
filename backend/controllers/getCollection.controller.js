import CollectionModel from "../models/collection.model.js";

const getCollection = async (req, res) => {
  try {
    const collections = await CollectionModel.find();
    console.log(collections);
    res.status(200).json({
      message: "Collections retrieved successfully",
      data: collections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({
      error: "Failed to retrieve collections",
      details: error.message,
    });
  }
};

export default getCollection;
