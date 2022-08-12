import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test api/iamges/upload", () => {
    it("correct image format uploaded", async () => {
        const response = await request
            .post("/api/images/upload")
            .attach(
                "fullimage",
                `${process.cwd()}/src/tests/assets/images/image_test.png`
            );
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
            .attach(
                "filename",
                `${process.cwd()}/src/tests/assets/images/image_test.png`
            );
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
    it("correct query parameters", async () => {
        const response = await request.get(
            "/api/images?filename=image_test&width=100&height=100"
        );
        expect(response.status).toBe(200);
    });
    it("undefined width", async () => {
        const response = await request.get(
            "/api/images?filename=image&height=100"
        );
        expect(response.status).toBe(400);
    });
    it("undefined hight", async () => {
        const response = await request.get(
            "/api/images?filename=image&width=100"
        );
        expect(response.status).toBe(400);
    });
    it("undefined filename", async () => {
        const response = await request.get(
            "/api/images?filename=img&height=100"
        );
        expect(response.status).toBe(400);
    });
});
