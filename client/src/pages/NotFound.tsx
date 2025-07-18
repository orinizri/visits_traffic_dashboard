// src/pages/NotFoundPage.tsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        Page Not Found
      </Typography>
      <Typography variant="h5" mt={1}>
        There are other pages you can visit
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
}
