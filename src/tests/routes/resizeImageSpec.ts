import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

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