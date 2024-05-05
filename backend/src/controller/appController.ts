import { RequestHandler } from "express";

// Controller function for the homepage route
export const getHomepage: RequestHandler = (req, res, next) => {
  res.json({ sayit: "oh whot ssup" });
};

// Controller function for rendering the file upload page
export const getFileUploadPage: RequestHandler = (req, res, next) => {
  // Logic to render the file upload page
};

// Controller function for handling file upload
export const uploadFile: RequestHandler = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  res.status(200).json({});
};

// Controller function for handling file deletion
export const deleteFile: RequestHandler = (req, res, next) => {
  // Logic to handle file deletion
};

// Controller function for rendering the file edit page
export const getFileEditPage: RequestHandler = (req, res, next) => {
  // Logic to render the file edit page
};

// Controller function for handling file edit
export const editFile: RequestHandler = (req, res, next) => {
  // Logic to handle file edit
};

export const getDelelteAccount: RequestHandler = (req, res, next) => {};

export const postDelelteAccount: RequestHandler = (req, res, next) => {};
