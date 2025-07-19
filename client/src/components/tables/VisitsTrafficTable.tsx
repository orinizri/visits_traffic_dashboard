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
import { AddNewRowButton } from "../ui/AddRowButton";
import { formatDateToYMD } from "../../utils/utils";
import { visitsTrafficEntrySchema } from "../../schemas/zod.schemas";
import { toast } from "react-toastify";
import CreateVisitsTraffic from "./CreateVisitsTraffic";

interface VisitsTableProps<T> {
  data: T[];
  sort: SortState | null;
  onSort: (key: keyof T) => void;
  onUpdate: (entry: T) => Promise<boolean>;
  onDelete: (date: string) => Promise<boolean>;
  onCreate: (data: VisitsTrafficEntry) => Promise<boolean>;
}

const NewVisitTraffic = {
  date: "2025-05-01",
  visits: null,
};
export interface NewVisitTrafficInterface {
  date: string | null;
  visits: number | null;
}
export default function VisitsTable({
  data,
  sort,
  onSort,
  onUpdate,
  onDelete,
  onCreate,
}: VisitsTableProps<VisitsTrafficEntry>) {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState<VisitsTrafficEntry | NewVisitTrafficInterface>(
    NewVisitTraffic
  );
  const [showCreateRow, setShowCreateRow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingRow && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingRow]);

  const updateNewEntry = (key: keyof VisitsTrafficEntry, value: Date | number | null) => {
    setNewEntry(prev => ({
      ...prev,
      [key]: key === "date" && value !== null ? formatDateToYMD(new Date(value)) : value,
    }));
  };

  const handleEdit = (row: VisitsTrafficEntry) => {
    setEditingRow(row.date);
    setEditedValue(row.visits);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedValue(null);
  };

  const handleCreate = async () => {
    const parsed = visitsTrafficEntrySchema.safeParse(newEntry);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    await onCreate(parsed.data);
    setShowCreateRow(false);
    setNewEntry(NewVisitTraffic);
  };

  const handleSave = async (row: VisitsTrafficEntry) => {
    if (editedValue == null || editedValue === row.visits) return;
    const updatedRow = {
      ...row,
      visits: editedValue,
    };
    const parsed = visitsTrafficEntrySchema.safeParse(updatedRow);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    await onUpdate(parsed.data);
    handleCancel();
  };

  const handleDelete = async (row: VisitsTrafficEntry) => {
    const parsed = visitsTrafficEntrySchema.safeParse(row);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    await onDelete(row.date);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: VisitsTrafficEntry) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(row);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <>
      {/* ADD NEW ROW */}
      <AddNewRowButton onClick={() => setShowCreateRow(prev => !prev)} title="Add a new entry" />
      {/* TABLE */}
      <TableContainer component={Paper} sx={{ mt: 1, borderRadius: 2, maxHeight: 300 }}>
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
            {/* CREATE VISITS TRAFFIC */}
            {showCreateRow && (
              <CreateVisitsTraffic
                handleCreate={handleCreate}
                newEntry={newEntry}
                setShowCreateRow={setShowCreateRow}
                updateNewEntry={updateNewEntry}
              />
            )}
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
                      sx={{ width: 80 }}
                    />
                  ) : (
                    row.visits
                  )}
                </TableCell>
                <TableCell align="right">
                  {/* ACTIONS ON ROW */}
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
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row)}
                        aria-label="Delete"
                      >
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
    </>
  );
}
