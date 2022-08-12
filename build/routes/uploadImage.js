"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uploadImage = function (req, res) {
    if (req.file === undefined)
        res.status(400).send("please choose an image");
    else
        res.send("images saved successfuly");
};
exports.default = uploadImage;
