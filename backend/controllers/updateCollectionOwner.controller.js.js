import Collection from "../models/collection.model.js";

const updateCollectionOwner = async (req, res) => {
  try {
    const { collectionAddress, newOwner } = req.body;

    if (!collectionAddress || !newOwner) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: collectionAddress or newOwner",
      });
    }

    const updatedCollection = await Collection.findOneAndUpdate(
      { collectionAddress },
      { accountAddress: newOwner },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection owner updated successfully",
      updatedCollection,
    });
  } catch (error) {
    console.error("Error updating collection owner:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default updateCollectionOwner;
