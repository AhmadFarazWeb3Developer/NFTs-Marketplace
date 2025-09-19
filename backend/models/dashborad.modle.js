import mongoose from "mongoose";

const DashboradSchema = new mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
  },

  collections: [
    (collection: { type: collections.Types.ObjectId, ref: "collection" }),
  ],
});

const Dashborad = mongoose.model("dashboard", DashboradSchema);

export default Dashborad;
