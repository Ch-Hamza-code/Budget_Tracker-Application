import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.Styles';


const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', children }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
