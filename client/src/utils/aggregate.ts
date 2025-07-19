import { TimeInterval } from "../types/enum.types";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { formatDateToYMD } from "./utils";

/**
 * Returns a list of entries for the latest day/week/month interval,
 * filling in missing dates with zero visits.
 *
 * @param entries - List of raw visits entries (unsorted or partial)
 * @param interval - Interval type: day, week, or month
 */
export function getLastIntervalEntriesWithFill(
  entries: VisitsTrafficEntry[],
  interval: TimeInterval
): VisitsTrafficEntry[] {
  if (!entries?.length) return [];

  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const latestDate = new Date(sorted[sorted.length - 1].date);
  const result: VisitsTrafficEntry[] = [];

  const daysBack = interval === "day" ? 1 : interval === "week" ? 7 : 30;

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(latestDate);
    date.setDate(date.getDate() - i);
    const dateStr = formatDateToYMD(date);

    const existing = entries.find(e => formatDateToYMD(new Date(e.date)) === dateStr);
    result.push(existing ?? { date: dateStr, visits: 0 });
  }

  return result;
}

export function aggregateByDate<T>(
  entries: T[],
  interval: TimeInterval,
  sort = false,
  fieldDateToSortBy: keyof T | null = null
): VisitsTrafficEntry[] {
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
      data = getLastIntervalEntriesWithFill(entries as VisitsTrafficEntry[], TimeInterval.day);
      break;
    case "week":
    default:
      data = getLastIntervalEntriesWithFill(entries as VisitsTrafficEntry[], TimeInterval.week);
      break;
    case "month":
      data = getLastIntervalEntriesWithFill(entries as VisitsTrafficEntry[], TimeInterval.month);
  }

  return data;
}
