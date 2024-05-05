import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import appRoutes from "./routes/app-routes";
import authRoute from "./routes/auth-routes";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configure Multer for file upload
const upload = multer();

// Middleware to handle file uploads
app.use(upload.single("imageURL"));

//routes middlewares
app.use(appRoutes);
app.use("/auth", authRoute);

mongoose.connect(process.env.URI as string).then((result) => {
  console.log("connected to Mongo Database");
  app.listen(8080, () => console.log("listen on port 8080"));
});
