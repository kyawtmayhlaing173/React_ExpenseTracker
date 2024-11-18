/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import Form from "../components/Form";
// import { AppContext } from "../ThemedApp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postExpenses } from "../libs/fetcher";
import { queryClient } from "../ThemedApp";

export default function AddExpense() {
  const { error, setError } = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const create = useMutation(async (data) => postExpenses(data, token), {
    onError: async (e) => {
      setError(e);
    },
    onSuccess: async (result) => {
      await queryClient.cancelQueries("expenses");
      queryClient.invalidateQueries(['expenses', token]);
    },
  });

  const handleAddItem = (description, amount, category, notes) => {
    create.mutate({ description, amount, category });
    navigate("/");
  };

  return (
    <Box sx={{ margin: "20px auto", maxWidth: 600 }}>
      <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
        Add Expense 💸
      </Typography>
      <Form add={handleAddItem} />
    </Box>
  );
}
