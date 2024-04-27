"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});
const User = model("User", UserSchema);
exports.default = User;
