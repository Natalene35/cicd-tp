const request = require("supertest");
const app = require("../../src/server");

// Mock the greeting module to simulate an error
jest.mock("../../src/greeting", () => ({
  getGreeting: jest.fn(),
}));

const { getGreeting } = require("../../src/greeting");

describe("GET /hello", () => {
  it("should return Hello world", async () => {
    getGreeting.mockReturnValue("Hello world!");
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });
});

describe("GET /hello/:name", () => {
  it("should return Hello world with the name", async () => {
    getGreeting.mockReturnValue("Hello world! From Bob");
    const res = await request(app).get("/hello/Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Bob");
  });
});

describe("POST /hello", () => {
  it("should return Hello world with the name from header", async () => {
    getGreeting.mockReturnValue("Hello world! From Charlie");
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Charlie");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Charlie");
  });

  it("should return Hello world when no header is provided", async () => {
    getGreeting.mockReturnValue("Hello world!");
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return a 500 error if getGreeting throws an exception", async () => {
    getGreeting.mockImplementation(() => {
      throw new Error("Internal Server Error");
    });
    const res = await request(app).post("/hello").set("x-name", "Error");
    expect(res.statusCode).toBe(500);
  });
});
