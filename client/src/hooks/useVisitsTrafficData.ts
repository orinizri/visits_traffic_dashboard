import { useCallback, useEffect, useRef, useState } from "react";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { TimeInterval } from "../types/enum.types";
import { aggregateByDate } from "../utils/aggregate";
import { useAxios } from "./useAxios";
import { VisitsTrafficResponse } from "../types/api.types";
import { toast } from "react-toastify";

export type ViewMode = "daily" | "weekly" | "monthly";

type AggregatedDataCache = Partial<Record<ViewMode, VisitsTrafficEntry[]>>;

export function useVisitsTrafficData() {
  const { data: rawData, isLoading, error } = useAxios<VisitsTrafficResponse>("/visits-traffic");
  let { data } = rawData || {};
  // In memory caching for data
  const [cachedData, setCachedData] = useState(data || []);
  const cacheRef = useRef<AggregatedDataCache>({});

  useEffect(() => {
    if (data && data.length) setCachedData(data);
  }, [data]);

  const aggregate = useCallback(
    (mode: ViewMode) => {
      return aggregateByDate<VisitsTrafficEntry>(cachedData || [], mode as TimeInterval);
    },
    [cachedData]
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

  function createVisit(entry: VisitsTrafficEntry) {
    setCachedData(prev => {
      const exists = prev.some(e => e.date === entry.date);
      if (exists) {
        toast.error("Visit entry already exists for this date");
        return prev; // no change
      }

      const newData = [...prev, entry];

      newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return newData;
    });
  }

  function updateVisit(entry: VisitsTrafficEntry) {
    setCachedData(prev => prev.map(v => (v.date === entry.date ? entry : v)));
  }

  function deleteVisit(date: string) {
    setCachedData(prev => prev.filter(v => v.date !== date));
  }

  return {
    data: cachedData,
    getChartData,
    isLoading,
    error,
    createVisit,
    deleteVisit,
    updateVisit,
  };
}
