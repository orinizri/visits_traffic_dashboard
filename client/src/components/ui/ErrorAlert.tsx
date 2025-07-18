import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorAlert({
  message,
  onRetry,
  title = "Something went wrong",
}: ErrorAlertProps) {
  return (
    <Stack spacing={2} sx={{ my: 4 }}>
      <Alert severity="error" icon={<ErrorOutlineIcon />} role="alert">
        <AlertTitle>{title}</AlertTitle>
        {message}
        {onRetry && (
          <Button onClick={onRetry} variant="outlined" size="small" sx={{ mt: 1 }}>
            Retry
          </Button>
        )}
      </Alert>
    </Stack>
  );
}
