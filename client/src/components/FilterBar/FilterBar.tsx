import { Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FilterState } from "../../types/filter.types";
interface FilterBarProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
}

export function FilterBar({ filters, updateFilter, resetFilters }: FilterBarProps) {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap">
      <DatePicker
        label="Start Date"
        value={filters.startDate || null}
        onChange={date => updateFilter("startDate", date)}
      />
      <DatePicker
        label="End Date"
        value={filters.endDate || null}
        onChange={date => updateFilter("endDate", date)}
      />
      <Button onClick={() => resetFilters()}>Reset</Button>
    </Stack>
  );
}
