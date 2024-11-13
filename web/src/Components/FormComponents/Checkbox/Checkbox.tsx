// src/Components/Checkbox/Checkbox.tsx

import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, FormControlLabel } from '@mui/material';

// Define custom props to extend MUI's CheckboxProps with an optional label
interface CustomCheckboxProps extends MuiCheckboxProps {
  label?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({ label, ...props }) => {
  return label ? (
    <FormControlLabel
      control={<MuiCheckbox {...props} />}
      label={label}
    />
  ) : (
    <MuiCheckbox {...props} />
  );
};

export default Checkbox;
