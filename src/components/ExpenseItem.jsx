import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { deleteExpense } from "../libs/fetcher";

const ExpenseItem = ({ expense }) => {
  const navigate = useNavigate();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  const onEdit = (expense) => {
    navigate(`/addExpense`, { state: { expense } });
  };

  const onDelete = useMutation(async () => deleteExpense(expense), {
    onError: async () => {},
    onSuccess: async () => {
      await queryClient.cancelQueries("expenses");
      await queryClient.invalidateQueries(["expenses"]);
    }
  });

  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        mb: 2,
        backgroundColor: "background.paper",
        "&:hover": {
          boxShadow: 1,
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 500,
            wordBreak: "break-word",
            flex: 1,
            mr: 2,
          }}
        >
          {expense.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit expense">
            <IconButton
              size="small"
              onClick={() => onEdit(expense)}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "primary.light",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete expense">
            <IconButton
              size="small"
              onClick={() => onDelete.mutate()}
              sx={{
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "error.light",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={expense.category}
            color="primary"
            size="small"
            sx={{
              borderRadius: 1,
              textTransform: "capitalize",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "secondary.main",
            }}
          >
            {formatCurrency(expense.amount)}
          </Typography>
        </Box>

        {expense.notes && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {expense.notes}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ExpenseItem;
