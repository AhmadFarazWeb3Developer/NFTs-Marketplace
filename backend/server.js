import express from "express";
import connectDB from "./DB/db.config.js";

const app = express();

const PORT = 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Post is Listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });
