import express from "express";
import * as appController from "../controller/appController";
import isAuth from "../middlewares/is-auth";

const router = express.Router();
router.get("/:username", appController.getHomepage);
router.use(isAuth);

// File upload routes
router.get("/file-upload", appController.getFileUploadPage);
router.post("/file-upload", appController.uploadFile);

// File delete route
router.delete("/file-delete", appController.deleteFile);

// detail
router.get("/:username/:imageId", appController.getImageDetail);

// File edit routes
router.get("/:username/:imageId/file-edit", appController.getFileEditPage);
router.put("/file-edit", appController.editFile);

// find user
router.get("/find-user", appController.onFindUser);

// comment
router.get("/comment/:imageId", appController.getComments);
router.post("/comment/:userId/:imageId/", appController.comment);

// reaction
router.get("/reaction/:imageId/", appController.getReactions);
router.post("/reaction/:imageId/", appController.postReaction);

// Delete account
router.get("/delete-account", appController.getDelelteAccount);
router.post("/delete-account", appController.postDelelteAccount);

export default router;
