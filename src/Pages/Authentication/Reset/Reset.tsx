import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Buttons/Button';
import {Container,Title, Subtitle, Form, FooterText,LinkText,} from './Reset.Styles';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>Enter your email for a reset link.</Subtitle>
     
      <Form onSubmit={handleResetPassword}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email"/>
        <Button type="submit">Send Reset Password Link</Button>
      </Form>

      <FooterText>
        Don't have an account? <LinkText as={Link} to="/signup">Sign Up</LinkText>
      </FooterText>
    </Container>
  );
};

export default ResetPassword;
