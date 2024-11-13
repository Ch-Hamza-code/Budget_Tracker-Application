import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../Components/Buttons/Button';
import {Container } from './Reset.Styles';
import { InputField } from '../../../Components/FormComponents/FormComponents';
import { ResetFormInputs } from './Reset.types';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const { handleSubmit , control, formState: { errors } } = useForm<ResetFormInputs>();

  const onSubmit = async (data: ResetFormInputs) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/password-reset', data);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to send reset password link.');
    }
  };


  return (
    <Container>
      <h1>Reset Password</h1>
      <p>Enter your email for a reset link.</p>

     <div className='ResetForm'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <InputField 
          control={control} 
          name='email'
          type='email' 
          label='Enter an Email'
          error={!!errors.email} 
          placeholder='First Name'
          helperText={errors?.email?.message}
        />
        <Button type="submit" variant="contained">SEND RESET PASSWORD LINK</Button>
      </form>
      </div>

      <div className='footer'>
        Don't have an account? <Button href="/signup" variant='text'>SignUp?</Button>
      </div>
      <div className='footer'>
        Don't have an account? <Button href="/expense-table" variant='text'>New?</Button>
      </div>
    </Container>
  );
};

export default ResetPassword;
