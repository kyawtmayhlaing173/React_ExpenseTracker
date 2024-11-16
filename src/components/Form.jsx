import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

export default function Form({ add }) {
  const descriptionRef = useRef();
  const notesRef = useRef();
  const amountRef = useRef();

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        console.log(e);
        const description = descriptionRef.current.value;
        const category = selectedValue;
        const notes = notesRef.current.value;
        const amount = amountRef.current.value;
        add(description, amount, category, notes);
        e.currentTarget.reset();
      }}
    >
      <Box sx={{ mb: 4, textAlign: "right" }}>
        <TextField
          inputRef={descriptionRef}
          label="Description"
          type="text"
          placeholder="Tell me about your expense"
          fullWidth
          multiline
          sx={{ mb: 4 }}
        />
        <TextField
          type="number"
          label="Expense"
          placeholder="How much did you spend 🤑"
          variant="outlined"
          inputRef={amountRef}
          inputProps={{
            min: 0,
            max: 10000,
            step: 100,
          }}
          fullWidth
          sx={{ mb: 4 }}
        />
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="dropdown-label">Select an option</InputLabel>
          <Select
            labelId="dropdown-label"
            value={selectedValue}
            onChange={handleChange}
            label="Choose a category"
            sx={{
              textAlign: "left",
            }}
          >
            <MenuItem value={"Leisure"}>Leisure</MenuItem>
            <MenuItem value={"Electronics"}>Electronics</MenuItem>
            <MenuItem value={"Utilities"}>Utilities</MenuItem>
            <MenuItem value={"Clothing"}>Clothing</MenuItem>
            <MenuItem value={"Health"}>Health</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          inputRef={notesRef}
          type="text"
          label="Additional Notes"
          placeholder="Any Additional Notes?"
          fullWidth
          multiline
          sx={{ mb: 4 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </form>
  );
}
