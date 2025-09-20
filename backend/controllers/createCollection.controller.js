const createCollection = (req, res) => {
  try {
    const { name, symbol } = req.body;
    const image = req.file;

    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Image:", image);

    if (!name || !symbol) {
      return res.status(400).json({ error: "Name and symbol are required" });
    }

    res.status(201).json({
      message: "Collection created",
      data: {
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
