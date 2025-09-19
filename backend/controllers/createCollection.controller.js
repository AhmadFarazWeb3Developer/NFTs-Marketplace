const createCollection = (req, res) => {
  try {
    const { formData } = req.body; // ✅ no await here

    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Image:", image);

    res.status(201).json({ name, symbol, image });
  } catch (error) {
    console.error("Error in createCollection:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default createCollection;
