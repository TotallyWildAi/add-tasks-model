// Vitest unit test for the Zod title validator. Runs in isolation in Node —
// no DB required — so the test pipeline stays fast.
import { describe, expect, it } from "vitest";
import { createTaskSchema } from "@/lib/schemas";

describe("createTaskSchema", () => {
  it("accepts a valid title and trims surrounding whitespace", () => {
    const parsed = createTaskSchema.parse({ title: "  buy milk  " });
    expect(parsed.title).toBe("buy milk");
  });

  it("rejects an empty string", () => {
    expect(() => createTaskSchema.parse({ title: "" })).toThrow();
  });

  it("rejects a whitespace-only string", () => {
    expect(() => createTaskSchema.parse({ title: "   " })).toThrow();
  });

  it("rejects a missing title field", () => {
    expect(() => createTaskSchema.parse({})).toThrow();
  });
});
