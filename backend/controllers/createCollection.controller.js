const createCollection = (req) => {
  const { name, symbol, image } = req.body;

  console.log(name);
  console.log(symbol);
  console.log(image);
};

export default createCollection;
