import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginStyled, LeftSection, RightSection, Form, RememberMe } from "./Login.Styles";
import Button from "../../../Components/Buttons/Button";
import { FormInputs } from "./Login.types";
import { CheckboxField, InputField } from "../../../Components/FormComponents/FormComponents";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, storeuser } from "./Login.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "../../../validations/validations";

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(LoginFormSchema),
  });
  const navigate = useNavigate();

  const Roles = (role: string) => {
    if (role === "admin") {
      navigate("/user-page");
    } else {
      navigate("/expense-table");
    }
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await login(data);
      storeuser(response);
      toast.success(response.message, {
        onClose: () => {
          Roles(response.profile.role);
        },
        autoClose: 1000,
      });
    } catch (error: any) {
      console.error("Login Error:", error.message);
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      Roles(role);
    }
  }, [navigate]);

  return (
    <LoginStyled>
      <div className="logo-container">
        <img className="logo-image" src="/Images/logoimage.svg" alt="Budget Tracker Logo" />
      </div>
      <ToastContainer />
      <LeftSection>
        <div className="text">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue to Budget Tracker</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name="email"
            type="email"
            label="Email"
            error={!!errors.email}
            placeholder="Enter an Email"
            helperText={errors?.email?.message}
          />
          <InputField
            control={control}
            name="password"
            type="password"
            label="Password"
            error={!!errors.password}
            placeholder="Enter password"
            helperText={errors?.password?.message}
          />

          <RememberMe>
            <CheckboxField name="rememberMe" label="Remember me" control={control} />
            <p className="reset-link">
              <a href="/reset">FORGOT PASSWORD?</a>
            </p>
          </RememberMe>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </Form>
        <p className="signup-link">
          Don't have an account?<a href="/signup">Sign Up</a>
        </p>
      </LeftSection>

      <RightSection>
        <img src="/Images/Loginimage.svg" alt="" />
      </RightSection>
    </LoginStyled>
  );
};

export default LoginForm;
