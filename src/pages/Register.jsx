import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useRef } from "react";
import { useMutation } from "react-query";
import { useState } from "react";
import { postUser } from "../libs/fetcher";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const emailInput = useRef();
  const passwordInput = useRef();

  const navigate = useNavigate();

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

  const create = useMutation(async (data) => postUser(data), {
    onError: async (e) => {
      setError(e);
    },
    onSuccess: async () => {
      navigate("/login");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default", // Optional background for the entire page
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
        <Typography variant="h3">Register</Typography>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            <TextField placeholder="Email" fullWidth inputRef={emailInput} />
            <TextField
              type="password"
              placeholder="Password"
              fullWidth
              inputRef={passwordInput}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
