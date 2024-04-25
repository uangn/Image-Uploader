import express from "express";
import * as adminController from "../controller/adminController";

const router = express.Router();

// GET /
router.get("/", adminController.getIndex);

// POST /
router.post("/", adminController.postIndex);

// GET /view-users
router.get("/view-users", adminController.getViewUsers);

// DELETE /delete-user
router.delete("/delete-user", adminController.deleteDeleteUser);

// DELETE /image
router.delete("/image", adminController.deleteImage);

export default router;
