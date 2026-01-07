const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });
});

describe("E2E GET /hello/:name", () => {
  it("responds with Hello world and the name", async () => {
    const res = await axios.get(`${baseURL}/hello/Diana`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Diana");
  });
});

describe("E2E POST /hello", () => {
  it("responds with Hello world and the name from header", async () => {
    const res = await axios.post(
      `${baseURL}/hello`,
      {},
      { headers: { "x-name": "Eve" } }
    );
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Eve");
  });

  it("responds with Hello world when no header is provided", async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });
});
