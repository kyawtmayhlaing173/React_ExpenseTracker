import { useState } from "react";
import List from "./List";
import Item from "./Item";
import { Box, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function App() {
  // const { mode } = useContext;
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    { id: 1, description: "Learn Express", status: "INPROGRESS" },
    { id: 2, description: "Learn React", status: "TODO" },
    { id: 3, description: "AWS Solution Architect", status: "TODO" },
  ]);

  return (
    <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
      <Box sx={{ paddingBottom: 4, display: "flex", justifyContent:"space-between", alignItems: "center" }}>
        <Typography variant="h3" component="h3">
          E-Commerce
        </Typography>
        <AddCircleIcon color="primary" sx={{fontSize: 30}}/>
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
