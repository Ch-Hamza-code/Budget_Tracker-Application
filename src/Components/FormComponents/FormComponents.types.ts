import { BaseTextFieldProps, CheckboxProps } from "@mui/material"

export  interface InputFieldProps extends BaseTextFieldProps{
    control: any
    name: string
    label: string
    type: string
}

export interface CheckboxFieldProps {
    control: any;
    name: string;
    label?: string;
    defualtValue?: boolean
    // Additional props for Checkbox can be passed here if needed
  }