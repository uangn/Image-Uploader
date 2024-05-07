import express from "express";
import * as appController from "../controller/appController";
import isAuth from "../middlewares/is-auth";

const router = express.Router();
router.get("/:username", appController.getHomepage);
router.use(isAuth);

// Homepage rout

// File upload routes
router.get("/file-upload", appController.getFileUploadPage);
router.post("/file-upload", appController.uploadFile);

// File delete route
router.delete("/file-delete", appController.deleteFile);

// detail
router.get("/:username/:title", appController.getImageDetail);

// File edit routes
router.get("/file-edit", appController.getFileEditPage);
router.put("/file-edit", appController.editFile);

// Delete account
router.get("/delete-account", appController.getDelelteAccount);
router.post("/delete-account", appController.postDelelteAccount);

export default router;
