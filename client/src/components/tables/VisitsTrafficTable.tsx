import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { VisitsTrafficEntry } from "../../types/visitsTraffic.types";
import { SortState } from "../../types/filter.types";

interface VisitsTableProps<T> {
  data: T[];
  sort: SortState | null;
  onSort: (key: keyof T) => void;
  onUpdate: (entry: T) => Promise<boolean>;
  onDelete: (date: string) => Promise<boolean>;
}

export default function VisitsTable({
  data,
  sort,
  onSort,
  onUpdate,
  onDelete,
}: VisitsTableProps<VisitsTrafficEntry>) {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingRow && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingRow]);

  const handleEdit = (row: VisitsTrafficEntry) => {
    setEditingRow(row.date);
    setEditedValue(row.visits);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedValue(null);
  };

  const handleSave = async (row: VisitsTrafficEntry) => {
    if (editedValue == null || editedValue === row.visits) return;
    const success = await onUpdate({ ...row, visits: editedValue });
    console.log("success", success);
    handleCancel();
  };

  const handleDelete = async (row: VisitsTrafficEntry) => {
    const success = await onDelete(row.date);
    console.log("success", success);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: VisitsTrafficEntry) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(row);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!data.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        No results found for the selected filters.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, maxHeight: 600 }}>
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.date} hover>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                {editingRow === row.date ? (
                  <TextField
                    inputRef={inputRef}
                    size="small"
                    type="number"
                    value={editedValue ?? ""}
                    onChange={e => setEditedValue(Math.max(0, Number(e.target.value)))}
                    onKeyDown={e => handleKeyDown(e, row)}
                    inputProps={{ min: 0 }}
                    sx={{ width: 80 }}
                  />
                ) : (
                  row.visits
                )}
              </TableCell>
              <TableCell align="right">
                {editingRow === row.date ? (
                  <>
                    <IconButton size="small" onClick={() => handleSave(row)} aria-label="Save">
                      <SaveIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={handleCancel} aria-label="Cancel">
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton size="small" onClick={() => handleEdit(row)} aria-label="Edit">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(row)} aria-label="Delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
