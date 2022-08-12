"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resizeImage_1 = __importDefault(require("./routes/resizeImage"));
var uploadImage_1 = __importDefault(require("./routes/uploadImage"));
var multerConfig_1 = __importDefault(require("./multerConfig"));
var router = express_1.default.Router();
router.post("/api/images/upload", multerConfig_1.default.single("fullimage"), uploadImage_1.default);
router.get("/api/images", resizeImage_1.default);
exports.default = router;
