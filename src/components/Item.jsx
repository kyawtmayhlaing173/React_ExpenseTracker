import { Box, Typography, Chip } from "@mui/material";

export default function Item({ expense }) {

  return (
    <li style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
      <Box>
        <Typography variant="h4">{expense.description}</Typography>
        <Chip label={expense.category} color="primary" sx={{mb: 2, mt: 1}}/>
        <Typography>฿{expense.amount}</Typography>
        <Typography>Notes: {expense.notes}</Typography>
      </Box>
    </li>
  );
}
