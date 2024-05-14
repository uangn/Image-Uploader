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
    var _a;
    // console.log(req.body);
    // console.log(req.file);
    if (req.userId !== req.body.userID) {
        return res
            .status(403)
            .json({ message: "You can not post your image to other user account" });
    }
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
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Logic to handle file deletion
    const userId = req.userId;
    const imageId = req.get("imageId");
    const image = yield Image_1.default.findById(imageId);
    if (((_a = image === null || image === void 0 ? void 0 : image.postByUser) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
        return res
            .status(403)
            .json({ message: "you are not allowed to delete image from other user" });
    }
    const deleteImage = yield Image_1.default.findByIdAndDelete(imageId);
    res.status(200).json({ message: "image was deleted" });
});
exports.deleteFile = deleteFile;
// Controller function for rendering the file edit page
const getFileEditPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { username, imageId } = req.params;
    const user = (yield User_1.default.findOne({ username: username })) || { _id: "None" };
    if (userId !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
        return res
            .status(403)
            .json({ message: "You are not allowed to edit images from other user" });
    }
    res.status(200).json({});
});
exports.getFileEditPage = getFileEditPage;
// Controller function for handling file edit
const editFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const image = yield Image_1.default.findById(req.body.imageId);
    if (req.body.userID !== ((_b = image === null || image === void 0 ? void 0 : image.postByUser) === null || _b === void 0 ? void 0 : _b.toString())) {
        return res.status(403).json({ message: "Forbidden." });
    }
    if (((_c = image === null || image === void 0 ? void 0 : image.postByUser) === null || _c === void 0 ? void 0 : _c.toString()) !== req.userId)
        if (!req.file) {
            return res.status(401).json({ message: "Image missing" });
        }
    if (req.body.title.trim().length < 5) {
        return res.status(401).json({ message: "Missing title" });
    }
    const imageURL = "http://localhost:8080/images/" + ((_d = req.file) === null || _d === void 0 ? void 0 : _d.filename);
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
