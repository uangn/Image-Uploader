import { model, Schema } from "mongoose";

const ReactionSchema = new Schema({
  reactedByUser: { type: Schema.Types.ObjectId, ref: "User" },
  reactedforImage: { type: Schema.Types.ObjectId, ref: "Image" },
  reactionType: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const Reaction = model("Reaction", ReactionSchema);
export default Reaction;
