import { Box } from "@mui/material";
import VisitsTable from "../tables/VisitsTrafficTable";
import { FilterBar } from "../FilterBar/FilterBar";
import { TableManagerProps } from "../../hooks/useVisitsTableManager";

export default function TableContainer({
  filteredData,
  sort,
  updateSort,
  filters,
  updateFilter,
  resetFilters,
  onDelete,
  onUpdate,
  onCreate,
}: TableManagerProps) {
  return (
    <Box>
      <FilterBar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
      <VisitsTable
        data={filteredData}
        sort={sort}
        onSort={updateSort}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCreate={onCreate}
      />
    </Box>
  );
}
