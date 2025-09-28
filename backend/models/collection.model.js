import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
  },

  contractAddress: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

const CollectionModel = mongoose.model("collections", collectionSchema);

export default CollectionModel;
