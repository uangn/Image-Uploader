"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const app_routes_1 = __importDefault(require("./routes/app-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
// Configure Multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, new Date() + file.originalname);
    },
});
const filter = (req, file, cb) => {
    // Check file type or any other criteria
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg") {
        // Accept a file
        cb(null, true);
    }
    else {
        // Reject a file
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: filter });
// Middleware to handle file uploads
app.use(upload.single("imageURL"));
//routes middlewares
app.use("/auth", auth_routes_1.default);
app.use(app_routes_1.default);
mongoose_1.default.connect(process.env.URI).then((result) => {
    console.log("connected to Mongo Database");
    app.listen(8080, () => console.log("listen on port 8080"));
});
