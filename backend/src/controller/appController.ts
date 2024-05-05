import { RequestHandler } from "express";
import Image from "../models/Image";
import User from "../models/User";

// Controller function for the homepage route
export const getHomepage: RequestHandler = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username });
  const imgs = await Image.find({ postByUser: user?._id }).sort({ _id: -1 }); // sort by latest);
  console.log(imgs);

  res.status(200).json({ message: "Fetch images", images: imgs });
};

// Controller function for rendering the file upload page
export const getFileUploadPage: RequestHandler = (req, res, next) => {
  // Logic to render the file upload page
};

// Controller function for handling file upload
export const uploadFile: RequestHandler = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(401).json({ message: "Image missing" });
  }

  const imageURL = "http://localhost:8080/images/" + req.file?.filename;

  const newImage = new Image({
    imageURL: imageURL,
    title: req.body.title,
    postByUser: req.body.userID,
    content: req.body.content,
    reaction: {
      like: 0,
      cute: 0,
      hot: 0,
      cool: 0,
    },
    comment: [],
  });
  newImage.save();

  res.status(200).json({});
};

// Controller function for handling file deletion
export const deleteFile: RequestHandler = (req, res, next) => {
  // Logic to handle file deletion
};

// Controller function for rendering the file edit page
export const getFileEditPage: RequestHandler = (req, res, next) => {
  // Logic to render the file edit page
};

// Controller function for handling file edit
export const editFile: RequestHandler = (req, res, next) => {
  // Logic to handle file edit
};

export const getDelelteAccount: RequestHandler = (req, res, next) => {};

export const postDelelteAccount: RequestHandler = (req, res, next) => {};
