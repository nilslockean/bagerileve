import { z as zod } from "zod";

// Turns a Date object into a YYYY-MM-DD string
export function getDateString(date: Date) {
  return date.toISOString().split("T")[0];
}

// Returns all dates starting and ending with the provided dates
// in YYYY-MM-DD format
export function getDatesInRange(start: string, end: string, z = zod) {
  const schema = z.tuple([z.iso.date(), z.iso.date()]);
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

export function isDateInFuture(
  input: string | Date,
  baseDate = new Date()
): boolean {
  const timestamp =
    typeof input === "string" ? Date.parse(input) : input.getTime();

  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid input parameter: ${input}`);
  }

  return timestamp > baseDate.getTime();
}

export async function getAvailablePickupDates(
  minOffset: number,
  maxOffset: number,
  getDaysInRange: (min: string, max: string) => Promise<string[]>,
  entries: { pickupDates: string[] | null }[]
): Promise<string[]> {
  const pickupDateMin = addDays(minOffset);
  const pickupDateMax = addDays(maxOffset);

  const defaultPickupDates = await getDaysInRange(
    getDateString(pickupDateMin),
    getDateString(pickupDateMax)
  );

  const firstEntryWithLimitedDates = entries.find(
    ({ pickupDates }) => pickupDates !== null && pickupDates.length
  );

  if (!firstEntryWithLimitedDates) {
    return defaultPickupDates;
  }

  return (
    firstEntryWithLimitedDates.pickupDates?.filter((dateStr) =>
      isDateInFuture(dateStr)
    ) || []
  );
}
