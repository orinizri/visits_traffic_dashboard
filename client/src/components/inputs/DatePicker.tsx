import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface DatePickerInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  error,
  helperText,
}: DatePickerInputProps) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          fullWidth: true,
          error,
          helperText,
        },
      }}
    />
  );
}
