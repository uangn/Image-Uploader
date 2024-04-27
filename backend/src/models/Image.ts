import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ImageSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
  },
  postByUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
