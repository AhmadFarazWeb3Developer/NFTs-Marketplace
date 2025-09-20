const createCollection = (req, res) => {
  try {
    const { collectionName, collectionSymbol } = req.body;
    const collectionImage = req.file;

    if (!collectionName || !collectionSymbol) {
      return res.status(400).json({ error: "Name and symbol are required" });
    }

    res.status(201).json({
      message: "Collection created",
      data: {
        collectionName,
        collectionSymbol,
        collectionImage: collectionImage
          ? collectionImage.filename
          : "No image uploaded",
      },
    });
  } catch (error) {
    console.error("Error in createCollection:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default createCollection;
