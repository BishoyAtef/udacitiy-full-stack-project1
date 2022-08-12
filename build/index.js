"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var resizer_1 = __importDefault(require("./imageProcessing/resizer"));
var app = (0, express_1.default)();
var port = 8000;
var myStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/full");
    },
    filename: function (req, file, cb) {
        //store image in .png format
        cb(null, file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
            ".jpg");
    },
});
var fileFilter = function (req, file, cb) {
    //specify the accepted file types .jpep and .png only
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg")
        cb(null, true); //save the image
    else
        cb(null, false); //don't throw error and simply ignore the image
};
var upload = (0, multer_1.default)({
    storage: myStorage,
    limits: {
        fileSize: 1024 * 1024 * 5, //maximum image size 5MB
    },
    fileFilter: fileFilter,
});
app.listen(port, function () {
    console.log("app started listening at ".concat(port));
});
app.post("/api/images/upload", upload.single("fullimage"), function (req, res) {
    if (req.file === undefined)
        res.status(400).send("please choose an image");
    else
        res.send("images saved successfuly");
});
app.get("/api/images", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagepath, resizedimagepath, width, height, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                imagepath = path_1.default.join("./assets/full", req.query.filename + ".jpg");
                resizedimagepath = path_1.default.join("./assets/thumb", ((req.query.filename +
                    req.query.width) + req.query.height) +
                    ".jpg");
                if (!!fs_1.default.existsSync(resizedimagepath)) return [3 /*break*/, 2];
                width = parseInt(req.query.width);
                height = parseInt(req.query.height);
                return [4 /*yield*/, (0, resizer_1.default)(req.query.filename, imagepath, width, height)];
            case 1:
                _a.sent();
                fs_1.default.createReadStream(resizedimagepath).pipe(res.status(200));
                return [3 /*break*/, 3];
            case 2:
                fs_1.default.createReadStream(resizedimagepath).pipe(res.status(200));
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                if (error_1 instanceof Error)
                    res.status(400).send(error_1.message);
                else
                    res.status(400).send("invalid parameters");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = app;
