import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TimeInterval } from "../../types/enum.types";
import { capitalizeFirstLetter } from "../../utils/utils";

interface ToggleProps<T> {
  value: T;
  onChange: (newValue: T) => void;
}

export default function Toggle({ value, onChange }: ToggleProps<TimeInterval>) {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: TimeInterval | null) => {
    if (newValue !== null) onChange(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="Time interval toggle"
      color="primary"
    >
      {Object.values(TimeInterval).map(interval => (
        <ToggleButton value={interval} key={interval}>
          {capitalizeFirstLetter(interval)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
