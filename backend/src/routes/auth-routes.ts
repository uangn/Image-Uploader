import express from "express";
import * as authController from "../controller/authController";

const router = express.Router();

// Routes for login
router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);

// Routes for sign-up
router.get("/sign-up", authController.getSignUpPage);
router.post("/sign-up", authController.signup);

// Routes for editing password
router.get("/edit-password", authController.getEditPasswordPage);
router.post("/edit-password", authController.editPassword);

// Routes for deleting user
router.get("/delete-user", authController.getDeleteUserPage);
router.post("/delete-user", authController.deleteUser);
export default router;
