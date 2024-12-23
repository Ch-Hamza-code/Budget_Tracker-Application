import React from "react";
import { useForm } from "react-hook-form";
import { SignupContainer, LeftSection, RightSection } from "./Signup.Styles";
import Button from "../../../Components/Buttons/Button";
import { SignupFormInputs } from "./SignUp.types";
import { InputField } from "../../../Components/FormComponents/FormComponents";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "./signup.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema } from "../../../validations/validations";

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await signup(data);
      toast.success(response.message, {
        onClose: () => {
          window.location.href = "/login";
        },
        autoClose: 1000,
      });
    } catch (error: any) {
      console.error("Signup Error:", error.message);
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  return (
    <SignupContainer>
      <ToastContainer />
      <LeftSection>
        <h1>Sign Up</h1>
        <p>Welcome to our community</p>

        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-row">
            <InputField
              control={control}
              name="firstName"
              type="text"
              label="First Name"
              error={!!errors.firstName}
              placeholder="First Name"
              helperText={errors?.firstName?.message}
            />
            <InputField
              control={control}
              name="lastName"
              type="text"
              label="Last Name"
              error={!!errors.lastName}
              placeholder="Last Name"
              helperText={errors?.lastName?.message}
            />
          </div>

          <InputField
            control={control}
            name="email"
            type="email"
            label="Email"
            error={!!errors.email}
            placeholder="Enter Email"
            helperText={errors?.email?.message}
          />

          <InputField
            control={control}
            name="password"
            type="password"
            label="Password"
            error={!!errors.password}
            placeholder="Enter Password"
            helperText={errors?.password?.message}
          />
          <InputField
            control={control}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            error={!!errors.confirmPassword}
            placeholder="Confirm Password"
            helperText={errors?.confirmPassword?.message}
          />

          <InputField
            control={control}
            name="budgetLimit"
            type="number"
            label="Budget Limit"
            error={!!errors.budgetLimit}
            placeholder="Enter Amount"
            helperText={errors?.budgetLimit?.message}
          />

          <Button type="submit" variant="contained">
            Sign Up
          </Button>

          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </LeftSection>

      <RightSection>
        <img src="/Images/signupimage.svg" alt="signup"></img>
      </RightSection>
    </SignupContainer>
  );
};

export default SignUp;
