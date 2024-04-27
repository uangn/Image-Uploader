"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
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
exports.default = Comment;
