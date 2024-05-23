import { RequestHandler } from "express";
import Image from "../models/Image";
import User from "../models/User";
import Comment from "../models/Comment";
import mongoose from "mongoose";
import AuthRequest from "models/AuthRequest";
import Reaction from "../models/Reaction";

// Controller function for the homepage route
export const getHomepage: RequestHandler = async (req, res, next) => {
  const { username } = req.params;

  if (username.includes("find-user") || username.includes("comment")) {
    return next();
  }

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
  if (["comment", "reaction"].includes(username)) {
    return next();
  }
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
  if (!req.file) {
    console.log("Use old image");
  }

  if (req.body.title.trim().length < 5) {
    return res.status(401).json({ message: "Missing title" });
  }

  const imageURL = req.file
    ? "http://localhost:8080/images/" + req.file?.filename
    : image?.imageURL;

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

export const getComments: RequestHandler = async (req, res, next) => {
  const { imageId } = req.params;

  const comments = await Comment.find(
    { commentForImage: imageId },
    "commentByUser comment reaction"
  )
    .lean()
    .populate("commentByUser", "username profileImage")
    .sort({ _id: -1 });

  res.status(200).json(comments);
};

export const comment: RequestHandler = async (req: AuthRequest, res, next) => {
  const { username, userId, imageId, commentDetail } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ message: "Unknown user, comment failed" });
  }
  if (!imageId || !commentDetail) {
    return res.status(403).json({ message: "Unknown post, comment failed" });
  }

  const comment = new Comment({
    commentByUser: userId,
    comment: commentDetail,
    commentForImage: imageId,
    createdDate: new Date().toISOString(),
    reaction: {},
  });

  comment.save();

  res.status(200).json({});
};

export const onFindUser: RequestHandler = async (req, res, next) => {
  const queryString = req.query.q;

  try {
    const users = await User.find(
      {
        username: { $regex: queryString, $options: "i" },
      },
      "username profileImage"
    );

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReactions: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  const { imageId } = req.params;
  const userId = req.get("requestUser");
  let isReacted = false;
  let reactionType = "";
  const reactions = await Reaction.find({ reactedforImage: imageId });
  const initial = {
    like: 0,
    hot: 0,
    cute: 0,
    cool: 0,
  };

  reactions.reduce((prev, curr) => {
    prev[curr.reactionType as "cool"]++;
    if (curr.reactedByUser?.toString() === userId) {
      isReacted = true;
      reactionType = curr.reactionType;
    }
    return prev;
  }, initial);
  res.status(200).json({
    reactions: initial,
    isReacted: { hasReaction: isReacted, type: reactionType },
  });
};

export const postReaction: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  const { imageId } = req.params;
  const { userId, reactionType } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ message: "Unknown user, comment failed" });
  }

  const reaction = await Reaction.findOne({ reactedByUser: userId });

  const react = new Reaction({
    reactedByUser: userId,
    createdAt: new Date(),
    reactedforImage: imageId,
    reactionType: reactionType,
  });

  // create new react
  if (!reaction) {
    try {
      await react.save();
      return res.status(201).json({ message: "Added reaction", code: 0 });
    } catch (err) {
      return res.status(404).json({ message: "Unauthorized. Please login" });
    }
  }

  // already react
  if (reaction.reactionType !== reactionType) {
    reaction.reactionType = reactionType;
    await reaction.save();
    return res.status(201).json({ message: "Changed reaction", code: 2 });
  } else {
    await Reaction.findOneAndDelete({ reactedByUser: userId });
    return res.status(201).json({ message: "Deleted reaction", code: 1 });
  }
};

export const getDelelteAccount: RequestHandler = (req, res, next) => {};

export const postDelelteAccount: RequestHandler = (req, res, next) => {};
