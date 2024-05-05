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
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Configure Multer for file upload
const upload = (0, multer_1.default)();
// Middleware to handle file uploads
app.use(upload.single("imageURL"));
//routes middlewares
app.use(app_routes_1.default);
app.use("/auth", auth_routes_1.default);
mongoose_1.default.connect(process.env.URI).then((result) => {
    console.log("connected to Mongo Database");
    app.listen(8080, () => console.log("listen on port 8080"));
});
