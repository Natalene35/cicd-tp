const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });
});

describe("GET /hello/:name", () => {
  it("should return Hello world with the name", async () => {
    const res = await request(app).get("/hello/Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Bob");
  });
});

describe("POST /hello", () => {
  it("should return Hello world with the name from header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Charlie");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Charlie");
  });

  it("should return Hello world when no header is provided", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });
});
