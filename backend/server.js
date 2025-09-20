import express from "express";
import connectDB from "./DB/db.config.js";
import cors from "cors";
import dotenv from "dotenv";

import createCollectionRouter from "./routes/createCollection.route.js";
import mintNFTRouter from "./routes/mintNFT.route.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", createCollectionRouter);
app.use("/api/v1", mintNFTRouter);

connectDB()
  .then(() => {
    app.listen(PORT, (e) => {
      console.log("Post is Listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });
