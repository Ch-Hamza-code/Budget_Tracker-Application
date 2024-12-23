import React from "react";
import { ButtonProps } from "./Button.types";
import { ButtonStyled } from "./Button.Styles";

const Button: React.FC<ButtonProps> = ({ onClick, type = "button", children, variant, href, color }) => {
  return (
    <ButtonStyled onClick={onClick} type={type} variant={variant} href={href && href} color={color}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
