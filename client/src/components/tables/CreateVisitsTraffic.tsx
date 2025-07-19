import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DatePickerInput from "../inputs/DatePicker";
import { VisitsTrafficEntry } from "../../types/visitsTraffic.types";
import { NewVisitTrafficInterface } from "./VisitsTrafficTable";

interface CreateVisitsTrafficProps {
  newEntry: VisitsTrafficEntry | NewVisitTrafficInterface;
  updateNewEntry: (key: keyof VisitsTrafficEntry, value: Date | number | null) => void;
  handleCreate: () => Promise<void>;
  setShowCreateRow: (arg0: boolean) => void;
}

export default function CreateVisitsTraffic({
  newEntry,
  updateNewEntry,
  handleCreate,
  setShowCreateRow,
}: CreateVisitsTrafficProps) {
  return (
    <TableRow>
      <TableCell>
        <DatePickerInput
          value={
            newEntry.date && typeof +newEntry.date === "number"
              ? new Date(newEntry.date)
              : new Date("2025-01-01")
          }
          onChange={date => updateNewEntry("date", date)}
          slotProps={{ textField: { placeholder: "Date", size: "small" } }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type="number"
          size="small"
          placeholder="Visits"
          value={newEntry.visits}
          onChange={e => updateNewEntry("visits", Number(e.target.value))}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={handleCreate}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => setShowCreateRow(false)}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
