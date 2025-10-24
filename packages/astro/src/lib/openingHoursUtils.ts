import type { OpeningHours } from "./schemas/OpeningHoursSchema";

type ConsolidatedHour = {
  from: number;
  to: number;
  time?: string;
  closed?: boolean;
};

export function consolidateOpeningHours(days: OpeningHours["days"]) {
  // Define week order starting Monday → Sunday
  const weekOrder = [1, 2, 3, 4, 5, 6, 0];

  // Sort according to that order
  const sortedDays = Object.values(days).sort(
    (a, b) => weekOrder.indexOf(a.day) - weekOrder.indexOf(b.day)
  );

  const consolidated: ConsolidatedHour[] = [];

  for (const curr of sortedDays) {
    const last = consolidated[consolidated.length - 1];
    const sameAsLast =
      last &&
      ((last.closed && curr.closed) ||
        (!last.closed && !curr.closed && last.time === curr.time));

    if (sameAsLast) {
      // Extend the current group
      last.to = curr.day;
    } else {
      // Start a new group
      consolidated.push({
        from: curr.day,
        to: curr.day,
        ...(curr.closed ? { closed: true } : { time: curr.time || undefined }),
      });
    }
  }

  return consolidated;
}

export function formatDay(day: number) {
  const dayNames = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];

  return dayNames[day];
}

export function formatConsolidatedDays({ from, to }: ConsolidatedHour) {
  if (from === to) {
    return formatDay(from);
  }

  return `${formatDay(from)}-${formatDay(to)}`;
}
