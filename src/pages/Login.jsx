import { useNavigate } from "react-router-dom";
// import { useApp } from "../ThemedApp";
import { Button, Box, TextField, Typography, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";

export default function Login() {
  const navigate = useNavigate();

  const emailInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (!email || !password) {
      setError("Email and password is required");
      return false;
    }

    create.mutate({ email: email, password: password });
  };

  const create = useMutation(async (data) => postLogin(data), {
    onError: async (e) => {
      console.log(`Cannot create account ${e}`);
      setError(e);
    },
    onSuccess: async () => {
      navigate("/");
    },
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField placeholder="Email" inputRef={emailInput} />
          <TextField
            type="password"
            placeholder="Password"
            inputRef={passwordInput}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
