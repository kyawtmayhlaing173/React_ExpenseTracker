import { useNavigate } from "react-router-dom";
// import { useApp } from "../ThemedApp";
import { Button, Box, TextField, Typography, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";
import { useApp } from "../ThemedApp";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useApp();

  const emailInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }

    create.mutate({ email: email, password: password });
  };

  const create = useMutation(async (data) => postLogin(data), {
    onError: async (e) => {
      setError(e);
    },
    onSuccess: async (result) => {
      localStorage.setItem("token", result.token);
      setAuth(result);
      navigate("/");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "20px auto",
          backgroundColor: "divider",
          padding: "24px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3">Login</Typography>
        {error && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 4 }}>
            <TextField placeholder="Email" inputRef={emailInput} />
            <TextField
              type="password"
              placeholder="Password"
              inputRef={passwordInput}
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
