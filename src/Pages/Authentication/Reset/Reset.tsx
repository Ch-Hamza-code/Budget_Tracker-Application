import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../Components/FormComponents/Input/Input';
import Button from '../../../Components/Buttons/Button';
import {Container } from './Reset.Styles';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <h1>Reset Password</h1>
      <p>Enter your email for a reset link.</p>

     <div className='ResetForm'>
      <form onSubmit={handleResetPassword}>
        {/* <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email"/> */}
        <Button type="submit" variant="contained">SEND RESET PASSWORD LINK</Button>
      </form>
      </div>

      <div className='footer'>
        Don't have an account? <Button href="/SignUp" variant='text'>SignUp?</Button>
      </div>
    </Container>
  );
};

export default ResetPassword;
