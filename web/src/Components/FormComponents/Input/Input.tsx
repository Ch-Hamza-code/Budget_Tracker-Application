import React from "react";
import TextField from "@mui/material/TextField";
import { InputFieldProps } from "./Input.types";

const Input: React.FC<InputFieldProps> = ({ label, name, ...props }) => {
  return <TextField fullWidth variant="outlined" margin="normal" {...props} label={label || ""} name={name} />;
};

export default Input;
