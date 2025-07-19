import { DatePicker } from "@mui/x-date-pickers";

interface DatePickerInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
  slotProps?: { textField: { placeholder: string; size: string } };
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  error,
  helperText,
  minDate,
  maxDate,
  slotProps,
}: DatePickerInputProps) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
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
