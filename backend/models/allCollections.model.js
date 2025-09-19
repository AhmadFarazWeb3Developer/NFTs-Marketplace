import mongoose, { Schema } from "mongoose";

const allCollectionsSchema = mongoose.Schema({
  collections: [{ type: Schema.Type.objectId, ref: "collections" }],
});

const AllCollectionsModel = mongoose.model(
  "allCollections",
  allCollectionsSchema
);

export default AllCollectionsModel;
