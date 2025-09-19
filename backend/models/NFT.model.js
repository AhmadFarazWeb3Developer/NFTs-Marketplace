import mongoose, { modelNames } from "mongoose";

const NFTSchema = new mongoose.Schema({
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

  id: {
    type: Number,
    require: true,
  },

  owner: {
    type: Number,
    require: true,
  },

  CollectionName: {
    type: Number,
    require: true,
  },

  status: {
    type: String,
    enum: ["For Sale", "Sold", "Not For Sale"],
    default: "Not For Sale",
  },
});

const NftModel = mongoose.model("NFT", NFTSchema);

export default NftModel;
