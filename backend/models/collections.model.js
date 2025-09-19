import mongoose from "mongoose";

const collectionsSchema = mongoose.Schema({
  collections: [
    (collection: { type: collection.Type.objectId, ref: "collection" }),
  ],
});

const Collections = mongoose.model("collections", collectionsSchema);

export default Collections;
