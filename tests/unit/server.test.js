const request = require("supertest");
const app = require("../../src/server");

// Mock the greeting module
jest.mock("../../src/greeting", () => ({
  getGreeting: jest.fn(),
}));

const { getGreeting } = require("../../src/greeting");

describe("Server Unit Tests", () => {
  describe("GET /hello/:name?", () => {
    it("should call getGreeting with the name from params", async () => {
      getGreeting.mockReturnValue("Hello world! From Bob");
      const res = await request(app).get("/hello/Bob");
      expect(getGreeting).toHaveBeenCalledWith("Bob");
      expect(res.text).toBe("Hello world! From Bob");
    });

    it("should call getGreeting with undefined when no name is provided", async () => {
      getGreeting.mockReturnValue("Hello world!");
      const res = await request(app).get("/hello");
      expect(getGreeting).toHaveBeenCalledWith(undefined);
      expect(res.text).toBe("Hello world!");
    });
  });

  describe("POST /hello", () => {
    it("should call getGreeting with the name from x-name header", async () => {
      getGreeting.mockReturnValue("Hello world! From Charlie");
      const res = await request(app)
        .post("/hello")
        .set("x-name", "Charlie");
      expect(getGreeting).toHaveBeenCalledWith("Charlie");
      expect(res.text).toBe("Hello world! From Charlie");
    });

    it("should call getGreeting with undefined when no x-name header is provided", async () => {
      getGreeting.mockReturnValue("Hello world!");
      const res = await request(app).post("/hello");
      expect(getGreeting).toHaveBeenCalledWith(undefined);
      expect(res.text).toBe("Hello world!");
    });
  });
});
