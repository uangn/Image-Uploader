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
const getLoginPage = (req, res, next) => { };
exports.getLoginPage = getLoginPage;
const login = (req, res, next) => {
    // Implementation for handling the login request
};
exports.login = login;
const getSignUpPage = (req, res, next) => {
    // Implementation for handling the sign-up page request
    res.json({ hi: "ho" });
};
exports.getSignUpPage = getSignUpPage;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (data.password.length >= 12) {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
        console.log(hashedPassword);
        const user = new User_1.default(Object.assign(Object.assign({}, data), { password: hashedPassword, image: [] }));
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
