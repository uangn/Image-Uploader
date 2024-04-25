"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFile = exports.getFileEditPage = exports.deleteFile = exports.uploadFile = exports.getFileUploadPage = exports.getHomepage = void 0;
// Controller function for the homepage route
const getHomepage = (req, res, next) => {
    res.json({ sayit: "oh whot ssup" });
};
exports.getHomepage = getHomepage;
// Controller function for rendering the file upload page
const getFileUploadPage = (req, res, next) => {
    // Logic to render the file upload page
};
exports.getFileUploadPage = getFileUploadPage;
// Controller function for handling file upload
const uploadFile = (req, res, next) => {
    // Logic to handle file upload
};
exports.uploadFile = uploadFile;
// Controller function for handling file deletion
const deleteFile = (req, res, next) => {
    // Logic to handle file deletion
};
exports.deleteFile = deleteFile;
// Controller function for rendering the file edit page
const getFileEditPage = (req, res, next) => {
    // Logic to render the file edit page
};
exports.getFileEditPage = getFileEditPage;
// Controller function for handling file edit
const editFile = (req, res, next) => {
    // Logic to handle file edit
};
exports.editFile = editFile;
