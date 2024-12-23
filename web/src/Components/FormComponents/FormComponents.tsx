import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input/Input";
import { CheckboxFieldProps, InputFieldProps } from "./FormComponents.types";
import Checkbox from "./Checkbox/Checkbox";

export const InputField: React.FC<InputFieldProps> = ({ control, label, type, name, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: `${name} is required` }}
      render={({ field }) => (
        <Input
          {...field}
          {...props}
          label={label || ""}
          type={type}
          error={props?.error}
          helperText={props?.helperText}
        />
      )}
    />
  );
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ control, defualtValue, name, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => <Checkbox {...field} {...props} label={label} checked={field.value} />}
    />
  );
};
