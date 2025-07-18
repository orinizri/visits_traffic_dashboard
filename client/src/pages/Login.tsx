import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../hooks/useAuth";
import { fetchVisitsTraffic } from "../services/trafficService";

const LoginPage = () => {
  const { user, isLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("try axios");
    fetchVisitsTraffic();
    if (!isLoading && user) {
      console.log("User is authenticated:", user);
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="#fff"
      >
        <Typography variant="h4" fontWeight="bold">
          Login to Your Account
        </Typography>

        <Button
          onClick={loginWithGoogle}
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ py: 1.5 }}
          disabled={isLoading}
        >
          Continue with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
