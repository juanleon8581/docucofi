import { describe, it, expect } from "vitest";
import { localizedPath } from "../utils";

describe("localizedPath", () => {
  it("should prefix a path with the locale when the path starts with /", () => {
    expect(localizedPath("es", "/register")).toBe("/es/register");
  });

  it("should add a leading slash to the path before prefixing with locale", () => {
    expect(localizedPath("en", "dashboard")).toBe("/en/dashboard");
  });
});
