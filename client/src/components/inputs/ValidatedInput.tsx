import { TextField, TextFieldProps } from "@mui/material";

type ValidatedInputProps = TextFieldProps & {
  errorMessage?: string;
};

export default function ValidatedInput({ errorMessage, ...props }: ValidatedInputProps) {
  return <TextField fullWidth error={!!errorMessage} helperText={errorMessage} {...props} />;
}
