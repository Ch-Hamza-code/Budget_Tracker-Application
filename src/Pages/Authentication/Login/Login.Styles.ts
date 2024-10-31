
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
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
  margin-right: 10px;
`;

export const LinkText = styled.a`
  color: rgba(117, 57, 255, 1);
  text-decoration: none;
  font-weight: bold;
`;
export const FooterText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;
