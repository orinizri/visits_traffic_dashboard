import { DatePicker } from "@mui/x-date-pickers";

interface DatePickerInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
  slotProps?: { textField: { placeholder: string; size: string } };
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  error,
  helperText,
  slotProps,
}: DatePickerInputProps) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        ...slotProps,
        textField: {
          fullWidth: true,
          error,
          helperText,
        },
      }}
    />
  );
}
