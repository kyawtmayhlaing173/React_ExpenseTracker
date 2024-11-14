import { IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

export default function Item({ content }) {
  const [taskDone, setTaskDone] = useState(false);

  return (
    <li style={{ padding: 0, borderBottom: "1px solid #ddd" }}>
      <IconButton
        onClick={() => {
          setTaskDone(!taskDone);
        }}
      >
        {taskDone ? (
          <CheckCircle color="success" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </IconButton>
      {content}
    </li>
  );
}
