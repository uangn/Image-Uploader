import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  profileImage: { type: String, default: "None" },
});

const User = model("User", UserSchema);
export default User;
