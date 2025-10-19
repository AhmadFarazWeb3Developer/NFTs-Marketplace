import collection from "../models/collection.model.js";

const updateCollectionOwner = async (req, res) => {
  try {
    const { collectionAddress, newOwner } = req.body;

    if (!collectionAddress || !newOwner) {
      return res.status(400).json({
        success: false,
        message: "collectionAddress and newOwner are required",
      });
    }

    const updated = await collection.findOneAndUpdate(
      { collectionAddress },
      { accountAddress: newOwner },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection owner updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating collection owner:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateCollectionOwner;
