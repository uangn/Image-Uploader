import { RequestHandler } from "express";
import Image from "../models/Image";
import User from "../models/User";
import mongoose from "mongoose";
import AuthRequest from "models/AuthRequest";

// Controller function for the homepage route
export const getHomepage: RequestHandler = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const imgs = await Image.find({ postByUser: user?._id }).sort({ _id: -1 }); // sort by latest);

  res.status(200).json({ message: "Fetch images", images: imgs });
};

// Controller function for rendering the file upload page
export const getFileUploadPage: RequestHandler = (req, res, next) => {
  // Logic to render the file upload page
};

// Controller function for handling file upload
export const uploadFile: RequestHandler = (req: AuthRequest, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  if (req.userId !== req.body.userID) {
    return res
      .status(403)
      .json({ message: "You can not post your image to other user account" });
  }

  if (!req.file) {
    return res.status(401).json({ message: "Image missing" });
  }

  if (req.body.title.trim().length < 5) {
    return res.status(401).json({ message: "Missing title" });
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

export const getImageDetail: RequestHandler = async (req, res, next) => {
  const { username, imageId } = req.params;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const imageDetail = await Image.find({
    _id: imageId,
  });
  if (imageDetail.length === 0) {
    res.status(401).json({ message: "This doesn't exist or was deleted" });
  } else {
    res.status(200).json({ imageDetail: imageDetail });
  }
};

// Controller function for handling file deletion
export const deleteFile: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  // Logic to handle file deletion
  const userId = req.userId;
  const imageId = req.get("imageId");
  const image = await Image.findById(imageId);
  if (image?.postByUser?.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "you are not allowed to delete image from other user" });
  }
  const deleteImage = await Image.findByIdAndDelete(imageId);

  res.status(200).json({ message: "image was deleted" });
};

// Controller function for rendering the file edit page
export const getFileEditPage: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  const userId = req.userId;
  const { username, imageId } = req.params;
  const user = (await User.findOne({ username: username })) || { _id: "None" };
  if (userId !== user?._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not allowed to edit images from other user" });
  }
  res.status(200).json({});
};

// Controller function for handling file edit
export const editFile: RequestHandler = async (req: AuthRequest, res, next) => {
  const image = await Image.findById(req.body.imageId);
  if (req.body.userID !== image?.postByUser?.toString()) {
    return res.status(403).json({ message: "Forbidden." });
  }
  if (image?.postByUser?.toString() !== req.userId)
    if (!req.file) {
      return res.status(401).json({ message: "Image missing" });
    }

  if (req.body.title.trim().length < 5) {
    return res.status(401).json({ message: "Missing title" });
  }

  const imageURL = "http://localhost:8080/images/" + req.file?.filename;

  await Image.findOneAndUpdate(
    { _id: req.body.imageId },
    {
      title: req.body.title,
      content: req.body.content,
      imageURL: imageURL,
    }
  );

  res.status(200).json({});
};

export const getDelelteAccount: RequestHandler = (req, res, next) => {};

export const postDelelteAccount: RequestHandler = (req, res, next) => {};
