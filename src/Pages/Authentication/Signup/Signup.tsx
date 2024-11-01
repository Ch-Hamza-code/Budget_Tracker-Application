import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { SignupContainer } from './Signup.Styles';
import Button from '../../../Components/Buttons/Button';
import { SignupFormInputs } from './SignUp.types';
import { InputField } from '../../../Components/FormComponents/FormComponents';

const SignUp: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<SignupFormInputs>();

  const onSubmit = (data: SignupFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <SignupContainer>
      <h2>Sign Up</h2>
      <p>Welcome to our community</p>

      <form className='Form' onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          control={control} 
          name='firstname' 
          type='text' 
          label='First Name'
          error={!!errors.firstname} 
          placeholder='First Name'
          helperText={errors?.firstname?.message}
        />
        <InputField 
          control={control} 
          name='Lastname' 
          type='text' 
          label='Last Name'
          error={!!errors.Lastname} 
          placeholder='Last Name'
          helperText={errors?.Lastname?.message}
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
          name='password' 
          type='password' 
          label='Password'
          error={!!errors.password} 
          placeholder='Enter Password'
          helperText={errors?.password?.message}
        />
        <InputField 
          control={control} 
          name='budget' 
          type='number' 
          label='Budget Limit'
          error={!!errors.budget} 
          placeholder='Enter a Amount'
          helperText={errors?.budget?.message}
        />
        <div>
        <Button type="submit" variant="contained">Sign Up</Button>
        </div>
      </form>
    </SignupContainer>
  );
};

export default SignUp;
