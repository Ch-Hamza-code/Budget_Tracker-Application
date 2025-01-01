import React, { useState } from "react";
import Button from "../../../Components/Buttons/Button";
import { Form, LeftSection, ResetContainer, RightSection } from "./Reset.Styles";
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
    <ResetContainer>
      <div className="logo-container">
        <img className="logo-image" src="/Images/logoimage.svg" alt="Budget Tracker Logo" />
      </div>
      <LeftSection>
        <h1>Reset Password</h1>
        <p>Enter your email for a reset link.</p>
        <div className="ResetForm">
          <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Form>
          <p className="reset-link">
            Don't have an account?<a href="/signup">Sign Up</a>
          </p>
        </div>
      </LeftSection>
      <RightSection>
        <img src="/Images/resetimage.svg" alt="reset"></img>
      </RightSection>
    </ResetContainer>
  );
};

export default ResetPassword;
