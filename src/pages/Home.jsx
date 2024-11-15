import List from "../List";
import Item from "../components/Item";
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../ThemedApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Home() {
  const navigate = useNavigate();
  const { data } = useContext(AppContext);

  return (
    <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <AccountCircleIcon color="primary" sx={{ fontSize: 50 }} />
        </IconButton>
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
          E-Commerce
        </Typography>
        <IconButton onClick={() => navigate("/addNote")}>
          <AddCircleIcon color="primary" sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
      <List>
        {data.map((item) => {
          // eslint-disable-next-line react/jsx-key
          return <Item content={item.description} />;
        })}
      </List>
    </Box>
  );
}
