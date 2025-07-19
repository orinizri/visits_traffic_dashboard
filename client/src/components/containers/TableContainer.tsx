import { Box, Typography } from "@mui/material";
import VisitsTable from "../tables/VisitsTrafficTable";
import { FilterBar } from "../FilterBar/FilterBar";
import { TableManagerProps } from "../../hooks/useVisitsTableManager";

interface TableContainerProps extends TableManagerProps {
  title: string;
}

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
  title,
}: TableContainerProps) {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
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
