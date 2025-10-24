import { z as zod } from "zod";

// Turns a Date object into a YYYY-MM-DD string
export function getDateString(date: Date) {
  return date.toISOString().split("T")[0];
}

// Returns all dates starting and ending with the provided dates
// in YYYY-MM-DD format
export function getDatesInRange(start: string, end: string, z = zod) {
  const schema = z.tuple([z.string().date(), z.string().date()]);
  const [startDateStr, endDateStr] = schema.parse([start, end]);
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    throw new Error("Start date must come before end date");
  }

  const dates: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dateStr = getDateString(
      new Date(current.getTime() - current.getTimezoneOffset() * 60000)
    );
    dates.push(dateStr);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function addDays(offset: number, baseDate = new Date()) {
  const result = new Date(baseDate);
  result.setDate(baseDate.getDate() + offset);
  return result;
}
