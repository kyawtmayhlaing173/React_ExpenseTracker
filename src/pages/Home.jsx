import Item from "../components/ExpenseItem";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "react-query";
import { fetchExpenses } from "../libs/fetcher";

export default function Home() {
  const navigate = useNavigate();
  const { auth, setAuth } = useApp();

  const { data, isLoading, isError, error } = useQuery(["expenses"], () =>
    fetchExpenses()
  );

  const logout = () => {
    setAuth(null);
    localStorage.setItem("token", null);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const addExpense = () => {
    navigate("/addExpense");
  };

  if (isError) {
    <Box>
      <Alert severity="warning">{error.message}</Alert>
    </Box>;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          sx={{
            color: "secondary.main",
          }}
        />
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {auth ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>{auth.email}</Typography>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <IconButton onClick={navigateToLogin}>
            <AccountCircleIcon color="primary" sx={{ fontSize: 30 }} />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          paddingBottom: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h3">
          Expense Tracker
        </Typography>
        <Button
          sx={{
            backgroundColor: "background.main",
            color: "white",
          }}
          onClick={addExpense}
        >
          <AddCircleIcon />
          <Typography>Add Expense</Typography>
        </Button>
      </Box>

      {data && data.length > 0 ? (
        data.map((item) => {
          return <Item expense={item} key={item.id} />;
        })
      ) : (
        <Typography
          sx={{
            fontSize: 30,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Nothing to show
        </Typography>
      )}
    </Box>
  );
}
