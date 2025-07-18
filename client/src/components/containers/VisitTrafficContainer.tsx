import { useVisitsFilters } from "../../hooks/useVisitsTrafficFilters";
import { VisitsTrafficEntry } from "../../types/visitsTraffic.types";
import { FilterBar } from "../FilterBar/FilterBar";
import VisitsTable from "../tables/VisitsTrafficTable";
import { Box, Typography } from "@mui/material";

export default function VisitsTrafficTableContainer({ data }: { data: VisitsTrafficEntry[] }) {
  const { filteredData, filters, updateFilter, sort, updateSort, resetFilters } =
    useVisitsFilters(data);

  return (
    <Box>
      <Typography variant="h6">Visits Traffic</Typography>
      <FilterBar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
      <VisitsTable visits={filteredData} sort={sort} onSort={updateSort} />
    </Box>
  );
}
