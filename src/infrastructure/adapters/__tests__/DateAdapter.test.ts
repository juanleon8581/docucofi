import { describe, it, expect } from "vitest";
import { DateAdapter } from "../DateAdapter";

describe("DateAdapter", () => {
  describe("toISOString", () => {
    it("formats a Date to ISO string", () => {
      const date = new Date(2026, 2, 23); // March 23, 2026
      expect(DateAdapter.toISOString(date)).toBe("2026-03-23");
    });
  });

  describe("fromISOString", () => {
    it("parses a valid ISO string to Date", () => {
      const date = DateAdapter.fromISOString("2026-03-23");
      expect(date).not.toBeNull();
      expect(DateAdapter.toISOString(date!)).toBe("2026-03-23");
    });

    it("returns null for an invalid string", () => {
      expect(DateAdapter.fromISOString("not-a-date")).toBeNull();
    });

    it("returns null for an empty string", () => {
      expect(DateAdapter.fromISOString("")).toBeNull();
    });
  });

  describe("toISOStringMultiple", () => {
    it("serializes an array of dates to a comma-separated string", () => {
      const dates = [new Date(2026, 2, 23), new Date(2026, 2, 24)];
      expect(DateAdapter.toISOStringMultiple(dates)).toBe("2026-03-23,2026-03-24");
    });

    it("returns empty string for an empty array", () => {
      expect(DateAdapter.toISOStringMultiple([])).toBe("");
    });
  });

  describe("fromISOStringMultiple", () => {
    it("deserializes a comma-separated string to an array of dates", () => {
      const dates = DateAdapter.fromISOStringMultiple("2026-03-23,2026-03-24");
      expect(dates).toHaveLength(2);
      expect(DateAdapter.toISOString(dates[0])).toBe("2026-03-23");
      expect(DateAdapter.toISOString(dates[1])).toBe("2026-03-24");
    });

    it("returns an empty array for an empty string", () => {
      expect(DateAdapter.fromISOStringMultiple("")).toEqual([]);
    });

    it("skips invalid date entries", () => {
      const dates = DateAdapter.fromISOStringMultiple("2026-03-23,invalid,2026-03-24");
      expect(dates).toHaveLength(2);
    });
  });

  describe("formatDisplay", () => {
    it("formats a date in Spanish", () => {
      const date = new Date(2026, 2, 23); // March 23, 2026
      expect(DateAdapter.formatDisplay(date)).toBe("23 de marzo de 2026");
    });
  });
});
