import { Box, TextField, Button } from "@mui/material";
import { useRef } from "react";

export default function Form({ add }) {
  const contentRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        console.log(e);
        const content = contentRef.current.value;
        add(content);
        e.currentTarget.reset();
      }}
    >
      <Box sx={{ mb: 4, textAlign: "right" }}>
        <TextField
          inputRef={contentRef}
          type="text"
          placeholder="Add your note"
          fullWidth
          multiline
          sx={{ mb: 1 }}
        />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </Box>
    </form>
  );
}
