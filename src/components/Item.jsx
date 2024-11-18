import { Box, Typography, Chip, ListItem } from "@mui/material";

export default function Item({ expense }) {
  return (
    <ListItem
      sx={{
        padding: 2,
        border: "1px solid #96CEB4",
        borderRadius: "10px",
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4">{expense["description"]}</Typography>
        <Chip
          label={expense["category"]}
          color="primary"
          sx={{ mb: 2, mt: 1 }}
        />
        <Typography>฿{expense["amount"]}</Typography>
        <Typography>Notes: {expense["notes"]}</Typography>
      </Box>
    </ListItem>
  );
}
