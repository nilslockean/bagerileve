import { describe, expect, test } from "vitest";
import {
  consolidateOpeningHours,
  formatConsolidatedDays,
} from "./openingHoursUtils";

describe("consolidateOpeningHours", () => {
  test("should consolidate opening hours correctly", async () => {
    const consolidatedHours = consolidateOpeningHours({
      sat: {
        closed: false,
        day: 6,
        time: "9-16",
      },
      sun: {
        closed: true,
        day: 0,
      },
      mon: {
        closed: true,
        day: 1,
      },
      tue: {
        closed: true,
        day: 2,
      },
      wed: {
        closed: false,
        day: 3,
        time: "11-18",
      },
      thu: {
        closed: false,
        day: 4,
        time: "11-18",
      },
      fri: {
        closed: false,
        day: 5,
        time: "11-18",
      },
    });

    expect(consolidatedHours).toEqual([
      { from: 1, to: 2, closed: true },
      { from: 3, to: 5, time: "11-18" },
      { from: 6, to: 6, time: "9-16" },
      { from: 0, to: 0, closed: true },
    ]);
  });
});

describe("formatConsolidatedDays", () => {
  test("should format single day", () => {
    const formatted = formatConsolidatedDays({ from: 0, to: 0 });
    expect(formatted).toEqual("söndag");
  });

  test("should format weekday range", () => {
    const formatted = formatConsolidatedDays({ from: 1, to: 4 });
    expect(formatted).toEqual("måndag-torsdag");
  });
});
