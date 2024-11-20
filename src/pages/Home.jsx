import { useState } from 'react';
import Item from "../components/ExpenseItem";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
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
  const [selectedValue, setSelectedValue] = useState("all");
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["expenses", selectedValue, customStartDate, customEndDate],
    () => {
      if (selectedValue === 'custom') {
        return fetchExpenses(selectedValue, customStartDate, customEndDate);
      }
      return fetchExpenses(selectedValue, customStartDate, customEndDate);
    },
    {
      enabled: (selectedValue !== 'custom') || (customStartDate != "" && customEndDate != ""),
    }
  );

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const addExpense = () => {
    navigate("/addExpense");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value === 'custom') {
      setOpenCustomDialog(true);
    }
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      refetch();
      setOpenCustomDialog(false);
    }
  };

  if (isError) {
    return (
      <Box>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
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
      {/* User Authentication Section */}
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

      {/* Header Section */}
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
          variant="contained"
          onClick={addExpense}
          startIcon={<AddCircleIcon />}
        >
          Add Expense
        </Button>
      </Box>

      {/* Filter Section */}
      <Box sx={{ display: "flex", flexDirection: "row", mb: 4, justifyContent: "flex-end" }}>
        <FormControl
          size="medium"
          sx={{
            width: "200px",
            height: "50px",
          }}
        >
          <Select
            value={selectedValue}
            onChange={handleChange}
            defaultValue="all"
            sx={{
              textAlign: "left",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="past-week">Past Week</MenuItem>
            <MenuItem value="last-month">Last Month</MenuItem>
            <MenuItem value="last-three-month">Last 3 months</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Expense List Section */}
      {data && data.length > 0 ? (
        data.map((item) => (
          <Item expense={item} key={item.id} />
        ))
      ) : (
        <Typography
          sx={{
            fontSize: 30,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4
          }}
        >
          Nothing to show
        </Typography>
      )}

      {/* Custom Date Range Dialog */}
      <Dialog 
        open={openCustomDialog} 
        onClose={() => setOpenCustomDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Select Custom Date Range</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Start Date"
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCustomDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCustomDateSubmit}
            variant="contained"
            disabled={!customStartDate || !customEndDate}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}