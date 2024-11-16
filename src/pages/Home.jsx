import List from "../List";
import Item from "../components/Item";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../ThemedApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Home() {
  const navigate = useNavigate();
  const { data, auth, setAuth } = useContext(AppContext);

  const logout = () => {
    setAuth(null);
  };

  const navigateToLogin = () => {
    console.log("Login");
    navigate("/login");
  };

  const addExpense = () => {
    navigate("/addExpense");
  };

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
            <Typography>{auth.user.email}</Typography>
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
            backgroundColor: "secondary.main",
            color: "white",
          }}
          onClick={addExpense}
        >
          <AddCircleIcon />
          <Typography>Add Expense</Typography>
        </Button>
      </Box>
      <List>
        {data.map((item) => {
          return <Item expense={item} key=""/>;
        })}
      </List>
    </Box>
  );
}
