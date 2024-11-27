import React, { useState } from "react";
import Button from "../../../Components/Buttons/Button";
import { Container } from "./Reset.Styles";
import { InputField } from "../../../Components/FormComponents/FormComponents";
import { ResetFormInputs } from "./Reset.types";
import { useForm } from "react-hook-form";

const ResetPassword: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetFormInputs>();

  const onSubmit = async (data: ResetFormInputs) => {};

  return (
    <Container>
      <h1>Reset Password</h1>
      <p>Enter your email for a reset link.</p>
      <div className="ResetForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name="email"
            type="email"
            label="Enter an Email"
            error={!!errors.email}
            placeholder="First Name"
            helperText={errors?.email?.message}
          />
          <Button type="submit" variant="contained">
            SEND RESET PASSWORD LINK
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
