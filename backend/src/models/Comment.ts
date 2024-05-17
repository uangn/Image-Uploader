import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchemma = new Schema({
  commentByUser: { type: Schema.Types.ObjectId, ref: "User" },
  commentForImage: { type: Schema.Types.ObjectId, ref: "Image" },
  comment: { type: String, required: true },
  reaction: {
    like: { type: Number, default: 0 },
    cute: { type: Number, default: 0 },
    cool: { type: Number, default: 0 },
  },
  createdDate: { type: Date, required: true },
});

const Comment = model("Comment", CommentSchemma);

export default Comment;
