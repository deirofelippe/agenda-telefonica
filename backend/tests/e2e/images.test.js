import { describe, test, expect, jest, afterEach } from "@jest/globals";
import app from "../../src/app.js";
import request from "supertest";
import "../../src/types/index.js";

describe("Requests", () => {
  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test("GET /images/presigned-url", async () => {
    const imageName = "teste.png";

    const res = await request(app).get(
      `/images/presigned-url?imageName=${imageName}`
    );

    const presignedUrl = res.body.url;

    expect(presignedUrl).toContain(`/agenda-images/${imageName}`);
    expect(res.status).toEqual(200);
  });
});
