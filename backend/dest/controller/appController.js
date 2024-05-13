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
exports.postDelelteAccount = exports.getDelelteAccount = exports.editFile = exports.getFileEditPage = exports.deleteFile = exports.getImageDetail = exports.uploadFile = exports.getFileUploadPage = exports.getHomepage = void 0;
const Image_1 = __importDefault(require("../models/Image"));
const User_1 = __importDefault(require("../models/User"));
// Controller function for the homepage route
const getHomepage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield User_1.default.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const imgs = yield Image_1.default.find({ postByUser: user === null || user === void 0 ? void 0 : user._id }).sort({ _id: -1 }); // sort by latest);
    res.status(200).json({ message: "Fetch images", images: imgs });
});
exports.getHomepage = getHomepage;
// Controller function for rendering the file upload page
const getFileUploadPage = (req, res, next) => {
    // Logic to render the file upload page
};
exports.getFileUploadPage = getFileUploadPage;
// Controller function for handling file upload
const uploadFile = (req, res, next) => {
    // console.log(req.body);
    // console.log(req.file);
    var _a;
    if (!req.file) {
        return res.status(401).json({ message: "Image missing" });
    }
    if (req.body.title.trim().length < 5) {
        return res.status(401).json({ message: "Missing title" });
    }
    const imageURL = "http://localhost:8080/images/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    const newImage = new Image_1.default({
        imageURL: imageURL,
        title: req.body.title,
        postByUser: req.body.userID,
        content: req.body.content,
        reaction: {
            like: 0,
            cute: 0,
            hot: 0,
            cool: 0,
        },
        comment: [],
    });
    newImage.save();
    res.status(200).json({});
};
exports.uploadFile = uploadFile;
const getImageDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, imageId } = req.params;
    const user = yield User_1.default.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const imageDetail = yield Image_1.default.find({
        _id: imageId,
    });
    if (imageDetail.length === 0) {
        res.status(401).json({ message: "This doesn't exist or was deleted" });
    }
    else {
        res.status(200).json({ imageDetail: imageDetail });
    }
});
exports.getImageDetail = getImageDetail;
// Controller function for handling file deletion
const deleteFile = (req, res, next) => {
    // Logic to handle file deletion
};
exports.deleteFile = deleteFile;
// Controller function for rendering the file edit page
const getFileEditPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //
    res.json({});
});
exports.getFileEditPage = getFileEditPage;
// Controller function for handling file edit
const editFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.file) {
        return res.status(401).json({ message: "Image missing" });
    }
    if (req.body.title.trim().length < 5) {
        return res.status(401).json({ message: "Missing title" });
    }
    const imageURL = "http://localhost:8080/images/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    yield Image_1.default.findOneAndUpdate({ _id: req.body.imageId }, {
        title: req.body.title,
        content: req.body.content,
        imageURL: imageURL,
    });
    res.status(200).json({});
});
exports.editFile = editFile;
const getDelelteAccount = (req, res, next) => { };
exports.getDelelteAccount = getDelelteAccount;
const postDelelteAccount = (req, res, next) => { };
exports.postDelelteAccount = postDelelteAccount;
