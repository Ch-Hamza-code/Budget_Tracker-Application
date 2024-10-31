import React from 'react';
import { StyledInput } from './Input.Styles';
import { InputProps } from './Input.types';


const Input: React.FC<InputProps> = ({ type = 'text', value, onChange, placeholder }) => {
  return (
    <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default Input;
