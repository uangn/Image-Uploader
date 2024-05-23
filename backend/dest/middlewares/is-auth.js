"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const auth = (req, res, next) => {
    var _a;
    const tokeen = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(tokeen, process.env.JWT_SECRET || "None");
    }
    catch (err) {
        return res.status(409).json({ message: "not login", status: 4092 });
    }
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    next();
};
exports.default = auth;
