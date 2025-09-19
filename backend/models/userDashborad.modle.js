import mongoose from "mongoose";

const UserDashboradSchema = new mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
  },

  collections: [{ type: collections.Types.ObjectId, ref: "collection" }],
});

const UserDashborad = mongoose.model("userDashboard", UserDashboradSchema);

export default UserDashborad;
