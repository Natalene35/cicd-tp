const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hello world message when no name is provided", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("returns the hello world message with a name", () => {
    expect(getGreeting("Alice")).toBe("Hello world! From Alice");
  });

  it("returns the hello world message when name is an empty string", () => {
    expect(getGreeting("")).toBe("Hello world!");
  });

  it("returns the hello world message when name is null", () => {
    expect(getGreeting(null)).toBe("Hello world!");
  });

  it("returns the hello world message with a number as name", () => {
    expect(getGreeting(123)).toBe("Hello world! From 123");
  });
});
