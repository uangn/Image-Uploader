"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appController = __importStar(require("../controller/appController"));
const is_auth_1 = __importDefault(require("../middlewares/is-auth"));
const router = express_1.default.Router();
router.get("/:username", appController.getHomepage);
router.use(is_auth_1.default);
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
// Delete account
router.get("/delete-account", appController.getDelelteAccount);
router.post("/delete-account", appController.postDelelteAccount);
exports.default = router;
