import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import appRoutes from "./routes/app-routes";
import authRoute from "./routes/auth-routes";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, new Date() + file.originalname);
  },
});

const filter: multer.Options["fileFilter"] = (req, file, cb) => {
  // Check file type or any other criteria
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // Accept a file
    cb(null, true);
  } else {
    // Reject a file
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

// Middleware to handle file uploads
app.use(upload.single("imageURL"));

//routes middlewares
app.use("/auth", authRoute);
app.use(appRoutes);

mongoose.connect(process.env.URI as string).then((result) => {
  console.log("connected to Mongo Database");
  app.listen(8080, () => console.log("listen on port 8080"));
});
