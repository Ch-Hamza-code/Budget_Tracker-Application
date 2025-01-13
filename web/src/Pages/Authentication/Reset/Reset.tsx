import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Buttons/Button";
import { InputField } from "../../../Components/FormComponents/FormComponents";
import { ResetContainer, Form, LeftSection, RightSection } from "./Reset.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword, verifyEmail } from "../../../Service/Reset.service";

const ResetPassword: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string; newPassword: string }>();
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (data: { email: string }) => {
    try {
      await verifyEmail(data.email);
      toast.success("Email verified. Proceed to reset your password.");
      setEmailVerified(true);
      setEmail(data.email);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Invalid email. Please enter a registered email.");
      } else {
        toast.error(error.response?.data?.message || "Failed to verify email.");
      }
    }
  };

  const handlePasswordReset = async (data: { newPassword: string }) => {
    try {
      await resetPassword(email, data.newPassword);
      toast.success("Password reset successfully.");
      setEmailVerified(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <ResetContainer>
      <ToastContainer />
      <div className="logo-container">
        <img src="/Images/logoimage.svg" alt="Logo" />
      </div>
      <LeftSection>
        {!emailVerified ? (
          <>
            <h1>Reset Password</h1>
            <p>Enter your email for a reset link.</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="email"
                type="email"
                label="Enter Email"
                error={!!errors.email}
                placeholder="Enter your email"
                helperText={errors?.email?.message}
              />
              <Button type="submit" variant="contained">
                Verify Email
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h1>Set New Password</h1>
            <Form onSubmit={handleSubmit(handlePasswordReset)}>
              <InputField
                control={control}
                name="newPassword"
                type="password"
                label="New Password"
                error={!!errors.newPassword}
                placeholder="Enter new password"
                helperText={errors?.newPassword?.message}
              />
              <Button type="submit" variant="contained">
                Reset Password
              </Button>
            </Form>
          </>
        )}
      </LeftSection>
      <RightSection>
        <img src="/Images/resetimage.svg" alt="Reset" />
      </RightSection>
    </ResetContainer>
  );
};

export default ResetPassword;
