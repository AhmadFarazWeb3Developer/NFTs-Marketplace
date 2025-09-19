import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/dream-nft-marketplace")
    .then(() => {
      console.log("DB CONNECTED!");
    });
};

export default connectDB;
