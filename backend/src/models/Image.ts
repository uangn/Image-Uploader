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
    like: { type: Number, required: true },
    cute: { type: Number, required: true },
    hot: { type: Number, required: true },
    cool: { type: Number, required: true },
  },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Image = model("Image", ImageSchema);
export default Image;
