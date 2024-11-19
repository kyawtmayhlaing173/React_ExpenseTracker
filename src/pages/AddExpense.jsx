/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import Form from "../components/Form";
// import { AppContext } from "../ThemedApp";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { postExpenses, updateExpense } from "../libs/fetcher";
import { queryClient } from "../ThemedApp";

export default function AddExpense() {
  const { error, setError } = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const expense = state?.expense;

  const create = useMutation(async (data) => postExpenses(data), {
    onError: async (e) => {
      setError(e);
    },
    onSuccess: async (result) => {
      await queryClient.cancelQueries("expenses");
      queryClient.invalidateQueries(['expenses']);
    },
  });

  const update = useMutation(async (data) => updateExpense(data), {
    onError: async (e) => {
      setError(e);
    },
    onSuccess: async () => {
      await queryClient.cancelQueries("expenses");
      queryClient.invalidateQueries(['expenses']);
    }
  })

  const handleAddItem = (description, amount, category, notes) => {
    if (expense) {
      const id = expense.id;
      update.mutate({ id, description, amount, category, notes });
      navigate("/");
    } else {
      create.mutate({ description, amount, category, notes });
      navigate("/");
    }
   
  };

  return (
    <Box sx={{ margin: "20px auto", maxWidth: 600 }}>
      <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
        Add Expense 💸
      </Typography>
      <Form add={handleAddItem} expense={expense} />
    </Box>
  );
}
