"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 8000;
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(router_1.default);
app.listen(port, function () {
    console.log("app started listening at ".concat(port));
});
exports.default = app;
