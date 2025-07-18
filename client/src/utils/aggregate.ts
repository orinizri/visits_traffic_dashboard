import { TimeInterval } from "../types/enum.types";

function getLastNEntries<T>(entries: T[], interval: TimeInterval): T[] {
  if (!entries || !entries?.length) return [];
  const N = interval === "day" ? 1 : interval === "week" ? 7 : 30;
  return entries.slice(-N);
}

export function aggregateByDate<T>(
  entries: T[],
  interval: TimeInterval,
  sort = false,
  fieldDateToSortBy: keyof T | null = null
): T[] {
  if (sort && fieldDateToSortBy) {
    entries.sort((a, b) => {
      const dateA = new Date(a[fieldDateToSortBy] as string);
      const dateB = new Date(b[fieldDateToSortBy] as string);
      return dateA.getTime() - dateB.getTime();
    });
  }
  let data;
  switch (interval) {
    case "day":
      data = getLastNEntries(entries, TimeInterval.day);
      break;
    case "week":
    default:
      data = getLastNEntries(entries, TimeInterval.week);
      break;
    case "month":
      data = getLastNEntries(entries, TimeInterval.month);
  }

  return data;
}
