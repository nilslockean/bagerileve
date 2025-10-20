import { test, expect, describe } from "vitest";
import { prettyCourseDates, formatPrice } from "./stringUtils";

describe("prettyCourseDates", () => {
  test("starts and ends on different days", () => {
    const start = new Date("2024-11-04T16:30:00+02:00");
    const end = new Date("2024-11-05T17:00:00+02:00");
    expect(prettyCourseDates(start, end)).toBe(
      "Måndag 4 november - tisdag 5 november 2024"
    );
  });

  test("start and end date identical", () => {
    const start = new Date("2024-11-04T16:30:00+02:00");
    const end = start;

    expect(prettyCourseDates(start, end)).toBe(
      "Måndag 4 november 2024 kl. 16:30"
    );
  });

  test("no end date", () => {
    const start = new Date("2024-11-04T16:30:00+02:00");

    expect(prettyCourseDates(start)).toBe("Måndag 4 november 2024 kl. 16:30");
  });

  test("starts and ends on same day but different times", () => {
    const start = new Date("2024-11-04T16:30:00+02:00");
    const end = new Date("2024-11-04T17:00:00+02:00");
    expect(prettyCourseDates(start, end)).toBe(
      "Måndag 4 november 2024 kl. 16:30 - 17:00"
    );
  });

  test("end date set but not time", () => {
    const start = new Date("2024-03-27T12:00:00+02:00");
    const end = new Date("2024-03-27T23:59:59+02:00");
    expect(prettyCourseDates(start, end)).toBe("Onsdag 27 mars 2024 kl. 12:00");
  });
});

describe("formatPrice", () => {
  test("formats single price", () => {
    expect(formatPrice([1])).toBe("1 kr");
  });

  test("formats price range", () => {
    expect(formatPrice([379, 580])).toBe("Från 379 kr");
  });

  test("formats unordered price range", () => {
    expect(formatPrice([2000, 1200, 104580])).toBe("Från 1 200 kr");
  });
});
