import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Buttons/Button';
import {Container, Title,Subtitle,Form,Label,RememberMe,Checkbox,LinkText,FooterText,} from './Login.Styles';




const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <Container>
      <Title>Welcome Back!</Title>
      <Subtitle>Sign in to continue to Budget Tracker</Subtitle>
      <Form onSubmit={handleLogin}>

        <Label>Email</Label>
        < Input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>

        <Label>Password</Label>
        <Input type="password" value={password}onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" />

        <RememberMe>
          <Checkbox type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}  />
          Remember me
          <LinkText as={Link} to="/Reset" >Forgot Password?</LinkText>
        </RememberMe>

        <Button type="submit">Log In</Button>
      </Form>

      <FooterText>
        Don't have an account? <LinkText as={Link} to="/signup">Sign Up</LinkText>
      </FooterText>
    </Container>
  );
};

export default LoginForm;
