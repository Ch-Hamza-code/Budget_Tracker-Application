import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { LoginStyled, Form, RememberMe } from './Login.Styles';
import Button from '../../../Components/Buttons/Button';
import { FormInputs } from './Login.types';
import { CheckboxField, InputField } from '../../../Components/FormComponents/FormComponents';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormInputs>({
    
});
const navigate = useNavigate();

const onSubmit = async (data: FormInputs) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', data)
    localStorage.setItem('token', response.data.token);
    localStorage.setItem("email", response?.data?.profile?.email || "");
    localStorage.setItem("userId", response?.data?.profile?.id || "")
    localStorage.setItem("role", response?.data?.profile?.role || "");
   
    toast.success(response.data.message, {
      onClose: () => {
        const role = response.data.profile.role;
        window.location.href = role === "admin" ? "/user-page" : "/expense-table";
      },
      autoClose: 1000
    });
    } catch (error: any) {
     
      const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';
      console.error('Login Error:', errorMessage);
      
      toast.error(errorMessage, { autoClose: 2000 });
    }
};

useEffect(()=>{
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      navigate("/user-page");
    } else {
      navigate("/expense-table");
    }
  }
},[])

  return (
    <LoginStyled>
      <ToastContainer />
      <h1>Welcome Back!</h1>
      <p>Sign in to continue to Budget Tracker</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          control={control} 
          name='email' 
          type='email' 
          label='Email'
          error={!!errors.email} 
          placeholder='Enter an Email'
          helperText={errors?.email?.message}
        />
        <InputField 
          control={control} 
          name='password' 
          type='password' 
          label='Password'
          error={!!errors.password} 
          placeholder='Enter password'
          helperText={errors?.password?.message}
        />
        
        <RememberMe>
        <CheckboxField name='rememberMe' label='Remember me' control={control} />
          <Button href="/reset" variant="text">Forgot Password?</Button>
        </RememberMe>
        <Button type="submit"  variant="contained">Log In</Button>
      </Form>
      <div className="footer">
        Don't have an account? <Button href="/signup" variant="text" color="primary">Signup</Button>
      </div>
    </LoginStyled>
  );
};

export default LoginForm;
