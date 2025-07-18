import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  message?: string;
  fullscreen?: boolean;
};

export default function LoadingSpinner({ message = "Loading…", fullscreen = true }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={fullscreen ? "100vh" : "auto"}
      width="100%"
      py={fullscreen ? 0 : 4}
    >
      <CircularProgress size={48} color="primary" />
      <Typography variant="body1" color="text.secondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
}
