import mongoose from "mongoose";

const allNFTsSchema = mongoose.Schema({
  allNFTs: [{ type: Schema.Type.objectId, ref: "NFT" }],
});

const allNFTsModel = new mongoose.model("allNFTs", allNFTsSchema);

export default allNFTsModel;
