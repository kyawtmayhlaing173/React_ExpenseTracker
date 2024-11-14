import { Box, Typography } from "@mui/material";
import Form from "../components/Form";
import { AppContext } from "../ThemedApp";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
    const { addItem } = useContext(AppContext);
    const navigate = useNavigate();

    const handleAddItem = (newItem) => {
        addItem(newItem);
        navigate("/");
    }

    return (
        <Box sx={{ margin: "20px auto", maxWidth: 600 }}>
            <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
                Add Note
            </Typography>
            <Form add={handleAddItem}/>
        </Box>
    )
}