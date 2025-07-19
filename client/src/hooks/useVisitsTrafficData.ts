import { useCallback, useRef } from "react";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { TimeInterval } from "../types/enum.types";
import { aggregateByDate } from "../utils/aggregate";
import { useAxios } from "./useAxios";
import { VisitsTrafficResponse } from "../types/api.types";
type ViewMode = "daily" | "weekly" | "monthly";

type AggregatedDataCache = Partial<Record<ViewMode, VisitsTrafficEntry[]>>;

export function useVisitsTrafficData() {
  const { data: rawData, isLoading, error } = useAxios<VisitsTrafficResponse>("/visits-traffic");
  const { data } = rawData || {};

  const cacheRef = useRef<AggregatedDataCache>({});

  const aggregate = useCallback(
    (mode: ViewMode) => {
      return aggregateByDate<VisitsTrafficEntry>(data || [], mode as TimeInterval);
    },
    [data]
  );

  const getChartData = useCallback(
    (mode: ViewMode): VisitsTrafficEntry[] => {
      if (!cacheRef.current[mode]) {
        cacheRef.current[mode] = aggregate(mode);
      }
      return cacheRef.current[mode]!;
    },
    [aggregate]
  );

  return {
    data,
    getChartData,
    isLoading,
    error,
  };
}
