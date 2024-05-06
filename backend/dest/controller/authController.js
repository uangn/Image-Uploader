"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getDeleteUserPage = exports.editPassword = exports.getEditPasswordPage = exports.signup = exports.getSignUpPage = exports.login = exports.getLoginPage = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getLoginPage = (req, res, next) => {
    if (req.userId) {
        res.status(200).json({ username: req.username, userID: req.userId });
    }
    else {
        res.status(401).json({ message: "Please login" });
    }
};
exports.getLoginPage = getLoginPage;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const user = yield User_1.default.findOne({ username: loginData.username });
    if (!user) {
        return res.status(403).json({
            message: "Name wasn't created yet",
        });
    }
    const correct = yield bcrypt_1.default.compare(loginData.password, user.password);
    if (!correct) {
        return res.status(403).json({
            message: "Wrong password",
        });
    }
    const token = jsonwebtoken_1.default.sign({ username: user.username, userId: user._id.toString() }, "mayakepatum", { expiresIn: "5 days" });
    res.status(200).json({
        token: token,
        username: user.username,
        userId: user._id.toString(),
    });
});
exports.login = login;
const getSignUpPage = (req, res, next) => {
    // Implementation for handling the sign-up page request
    res.json({ hi: "ho" });
};
exports.getSignUpPage = getSignUpPage;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield User_1.default.exists({ username: data.username });
    if (user) {
        res.status(403).json({ message: "Name already used" });
        return;
    }
    data.username = data.username.trim();
    if (data.username.length < 8) {
        res.status(403).json({ message: "Name too short" });
        return;
    }
    if (data.password.length >= 12) {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
        console.log(hashedPassword);
        const user = new User_1.default(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        user.save();
        res.status(202).json({});
    }
    else {
        res.status(400).json({ message: "Validation failed" });
    }
});
exports.signup = signup;
const getEditPasswordPage = (req, res, next) => {
    // Implementation for handling the edit password page request
};
exports.getEditPasswordPage = getEditPasswordPage;
const editPassword = (req, res, next) => {
    // Implementation for handling the edit password request
};
exports.editPassword = editPassword;
const getDeleteUserPage = (req, res, next) => {
    // Implementation for handling the delete user page request
};
exports.getDeleteUserPage = getDeleteUserPage;
const deleteUser = (req, res, next) => {
    // Implementation for handling the delete user request
};
exports.deleteUser = deleteUser;
