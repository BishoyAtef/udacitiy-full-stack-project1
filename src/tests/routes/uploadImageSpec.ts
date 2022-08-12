import supertest from "supertest";
import path from 'path';
import app from "../../index";

const request = supertest(app);

describe("Test api/iamges/upload", () => {
    const imagePath: string = path.join(
        "./src/tests/assets/images",
        "test.jpg"
    );
    it("correct image format uploaded", async () => {
        const response = await request
            .post("/api/images/upload")
            .attach("fullimage", imagePath);
        expect(response.status).toBe(200);
    });
    it("no image uploaded", async () => {
        const response = await request
            .post("/api/images/upload")
            .field("Content-Type", "multipart/form-data");
        expect(response.status).toBe(400);
    });
    it("incorrect key value", async () => {
        const response = await request
            .post("/api/images/upload")
            .attach("filename", imagePath);
        expect(response.status).toBe(500);
    });
    it("incorrect key value and no image choosen", async () => {
        const response = await request
            .post("/api/images/upload")
            .attach("filename", "");
        expect(response.status).toBe(400);
    });
});