import mongoose from "mongoose";

const collectionsSchema = mongoose.Schema({
  accountAddress: {
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

  items: {
    type: Number,
    require: true,
  },
  owners: {
    type: Number,
    require: true,
  },
  remaining: {
    type: Number,
    require: true,
  },

  forSale: {
    type: String,
    Enumerator: ["active", "notActive"],
  },
});

const Collections = mongoose.model("collections", collectionsSchema);

export default Collections;
