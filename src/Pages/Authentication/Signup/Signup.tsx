import React, { useState } from 'react';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Buttons/Button';
import {SignupContainer, Title , SubTitle,} from './Signup.Styles';




const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [budgetLimit, setBudgetLimit] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log({ firstName, lastName, email, password, confirmPassword, budgetLimit });
    };
  
    return (
      <SignupContainer>
        <Title>Sign Up</Title>
        <SubTitle>Welcome to our community</SubTitle>

        <form onSubmit={handleSubmit}>
          <Input type="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input type="last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="Confirm password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Input type="Number" placeholder="Budget Limit" value={budgetLimit} onChange={(e) => setBudgetLimit(e.target.value)} />
          <Button>Sign Up</Button>
        </form>
        
      </SignupContainer>
    );
  };
  
  export default SignUp;