import { useVisitsFilters } from "./useVisitsTrafficFilters";
import { useVisitsCrudManager } from "./useVisitsCrudManager";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { FilterState, SortState } from "../types/filter.types";

export interface TableManagerProps {
  filteredData: VisitsTrafficEntry[];
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  sort: SortState | null;
  updateSort: (key: keyof VisitsTrafficEntry) => void;
  onUpdate: (entry: VisitsTrafficEntry) => Promise<boolean>;
  onDelete: (date: string) => Promise<boolean>;
  loading: boolean;
}

export function useVisitsTableManager(data: VisitsTrafficEntry[]): TableManagerProps {
  const { filters, updateFilter, resetFilters, sort, updateSort, filteredData } =
    useVisitsFilters(data);

  const { updateVisit, deleteVisit, loading: crudLoading } = useVisitsCrudManager();

  return {
    filteredData,
    filters,
    updateFilter,
    resetFilters,
    sort,
    updateSort,
    onUpdate: updateVisit,
    onDelete: deleteVisit,
    loading: crudLoading,
  };
}
