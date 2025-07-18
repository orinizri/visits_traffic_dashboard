import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
} from "@mui/material";
import { VisitsTrafficEntry } from "../../types/visitsTraffic.types";
import { SortState } from "../../types/filter.types";

interface VisitsTableProps {
  visits: VisitsTrafficEntry[];
  sort: SortState | null;
  onSort: (key: keyof VisitsTrafficEntry) => void;
}

export default function VisitsTable({ visits, sort, onSort }: VisitsTableProps) {
  if (!visits.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        No results found for the selected filters.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 200 }}>
      <Table stickyHeader size="small" aria-label="Visits traffic table">
        <TableHead>
          <TableRow>
            <TableCell sortDirection={sort?.key === "date" ? sort.direction : false}>
              <TableSortLabel
                active={sort?.key === "date"}
                direction={sort?.key === "date" ? sort.direction : "asc"}
                onClick={() => onSort("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="right"
              sortDirection={sort?.key === "visits" ? sort.direction : false}
            >
              <TableSortLabel
                active={sort?.key === "visits"}
                direction={sort?.key === "visits" ? sort.direction : "asc"}
                onClick={() => onSort("visits")}
              >
                Visits
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map(row => (
            <TableRow key={row.date} hover>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
