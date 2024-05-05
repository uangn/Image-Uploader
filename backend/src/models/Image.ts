import mongoose from "mongoose";
import { title } from "process";

const { Schema, model } = mongoose;

const ImageSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
  },
  title: String,
  postByUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  reaction: {
    like: { amount: Number, require: true },
    cute: { amount: Number, require: true },
    hot: { amount: Number, require: true },
    cool: { amount: Number, require: true },
  },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Image = model("Image", ImageSchema);
export default Image;
