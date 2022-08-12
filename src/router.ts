import express from "express";
import resizeImage from "./routes/resizeImage";
import uploadImage from "./routes/uploadImage";
import upload from "./multerConfig";

const router = express.Router();

router.post("/api/images/upload", upload.single("fullimage"), uploadImage);
router.get("/api/images", resizeImage);

export default router;
