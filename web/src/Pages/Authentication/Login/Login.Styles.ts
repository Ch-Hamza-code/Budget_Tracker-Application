
import styled from 'styled-components';

export const LoginStyled = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;


  .footer{
    align-items: center;
  }
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  text-align: left;
  font-weight: 600;
  margin: 10px 0 5px;
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Checkbox = styled.input`
  margin-right: 2%;
`;

