import React from 'react';
import { useForm} from "react-hook-form";
import { SignupContainer } from './Signup.Styles';
import Button from '../../../Components/Buttons/Button';
import { SignupFormInputs } from './SignUp.types';
import { InputField } from '../../../Components/FormComponents/FormComponents';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', data);
      
      toast.success(response.data.message, {
        onClose: () => {
          window.location.href = '/login';
        },
        autoClose: 1000
      });
    } catch (error: any) {
      console.error(error); // Log error details
      alert(error.response?.data?.message || 'Error signing up. Please try again.');
    }
  };

  return (
    <SignupContainer>
      <ToastContainer />
      <h2>Sign Up</h2>
      <p>Welcome to our community</p>

      <form className='Form' onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          control={control} 
          name='firstName' 
          type='text' 
          label='First Name'
          error={!!errors.firstName} 
          placeholder='First Name'
          helperText={errors?.firstName?.message}
        />
        <InputField 
          control={control} 
          name='lastName' 
          type='text' 
          label='Last Name'
          error={!!errors.lastName} 
          placeholder='Last Name'
          helperText={errors?.lastName?.message}
        />
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
          placeholder='Enter Password'
          helperText={errors?.password?.message}
        />
        <InputField 
          control={control} 
          name='confirmPassword' 
          type='password' 
          label='Confirm Password'
          error={!!errors.confirmPassword} 
          placeholder='Confirm Password'
          helperText={errors?.confirmPassword?.message}
        />
        <InputField 
          control={control} 
          name='budgetLimit' 
          type='number' 
          label='Budget Limit'
          error={!!errors.budgetLimit} 
          placeholder='Enter a Amount'
          helperText={errors?.budgetLimit?.message}
        />
        <div>
        <Button type="submit" variant="contained">Sign Up</Button>
        </div>
      </form>
  
    </SignupContainer>
  );
};

export default SignUp;




