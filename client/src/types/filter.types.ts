import { VisitsTrafficEntry } from "./visitsTraffic.types";

export interface FilterState {
  startDate?: Date;
  endDate?: Date;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: keyof VisitsTrafficEntry;
  direction: SortDirection;
}
