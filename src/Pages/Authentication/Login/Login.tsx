import React from 'react';
import { useForm } from "react-hook-form";
import { LoginStyled, Form, RememberMe } from './Login.Styles';
import Button from '../../../Components/Buttons/Button';
import { FormInputs } from './Login.types';
import { CheckboxField, InputField } from '../../../Components/FormComponents/FormComponents';

const LoginForm: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      email: "uzair",
      password: "",
      rememberMe: 'checked',
    }
});

  const onSubmit = (data: FormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <LoginStyled>
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
          <Button href="/Reset" variant="text">Forgot Password?</Button>
        </RememberMe>
        <Button type="submit" variant="contained">Log In</Button>
      </Form>
      <div className="footer">
        Don't have an account? <Button href="/SignUp" variant="text" color="primary">Signup</Button>
      </div>
    </LoginStyled>
  );
};

export default LoginForm;
