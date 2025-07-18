import { VisitsTrafficEntry } from "./visitsTraffic.types";

export interface apiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface VisitsTrafficMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface VisitsTrafficResponse extends apiResponse<VisitsTrafficEntry[]> {
  meta: VisitsTrafficMeta;
}
