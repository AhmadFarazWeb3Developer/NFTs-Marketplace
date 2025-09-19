import express from "express";
import connectDB from "./DB/db.config.js";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import createCollectionRouter from "./routes/createCollection.route.js";
import { configDotenv } from "dotenv";

const app = express();

const PORT = 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/v1", createCollectionRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Post is Listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });
