import { useCallback, useMemo, useState } from "react";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { FilterState, SortState } from "../types/filter.types";

export function useVisitsFilters(data: VisitsTrafficEntry[]) {
  const [filters, setFilters] = useState<FilterState>({});
  const [sort, setSort] = useState<SortState | null>(null); // e.g., { key: "visits", direction: "asc" }

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateSort = useCallback((key: keyof VisitsTrafficEntry) => {
    setSort(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
    setSort(null);
  }, []);

  const filteredData = useMemo(() => {
    let result = [...data];
    result = result.filter(entry => {
      const date = new Date(entry.date);
      if (filters.startDate && date < filters.startDate) return false;
      if (filters.endDate && date > filters.endDate) return false;
      return true;
    });

    if (sort) {
      result.sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];
        if (aVal == null || bVal == null) return 0;

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sort.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        return 0;
      });
    }

    return result;
  }, [data, filters, sort]);

  return { filters, updateFilter, filteredData, resetFilters, sort, updateSort };
}
