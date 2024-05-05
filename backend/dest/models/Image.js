"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
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
exports.default = Image;
