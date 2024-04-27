import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchemma = new Schema({
  commentByUser: { type: Schema.Types.ObjectId, ref: "User" },
  reaction: {
    like: { amount: Number, require: true },
    cute: { amount: Number, require: true },
    cool: { amount: Number, require: true },
  },
  createdDate: { type: Date, required: true },
});

const Comment = model("Comment", CommentSchemma);

export default Comment;
