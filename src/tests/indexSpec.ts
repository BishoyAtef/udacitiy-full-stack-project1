import supertest from "supertest";
import app from "../index";
import path from "path";

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

describe("Test api/images endpoint responses", () => {
    const image = "pic";
    const width = 500;
    const height = 300;

    it("correct query parameters", async () => {
        const response = await request.get(
            `/api/images?filename=${image}&width=${width}&height=${height}`
        );
        expect(response.status).toBe(200);
    });
    it("undefined width", async () => {
        const response = await request.get(
            `/api/images?filename=${image}&height=${height}`
        );
        expect(response.status).toBe(400);
    });
    it("undefined hight", async () => {
        const response = await request.get(
            `/api/images?filename=${image}&width=${width}`
        );
        expect(response.status).toBe(400);
    });
    it("undefined filename", async () => {
        const response = await request.get(
            `/api/images?filename=img&height=${height}`
        );
        expect(response.status).toBe(400);
    });
});
