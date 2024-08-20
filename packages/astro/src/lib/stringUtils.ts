export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toLocaleDateString(date: Date) {
  return date.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Tallinn",
  });
}

export function toLocaleTimeString(date: Date) {
  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Tallinn",
  });
}

export function prettyCourseDates(start: Date, end?: Date) {
  const startDateString = toLocaleDateString(start);
  const endDateString = toLocaleDateString(end ?? start);

  if (startDateString === endDateString || end === undefined) {
    const endTimeString = end && toLocaleTimeString(end);

    return capitalize(
      `${startDateString} kl. ${toLocaleTimeString(start)}${
        endTimeString && start !== end && endTimeString !== "23:59"
          ? ` - ${endTimeString}`
          : ""
      }`
    );
  }

  return capitalize(`${startDateString} - ${endDateString}`);
}
