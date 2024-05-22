"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    reactedByUser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    reactedforImage: { type: mongoose_1.Schema.Types.ObjectId, ref: "Image" },
    reactionType: { type: String, required: true },
    createdAt: { type: Date, required: true },
});
const Reaction = (0, mongoose_1.model)("Reaction", ReactionSchema);
exports.default = Reaction;
