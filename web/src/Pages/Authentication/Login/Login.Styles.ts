import styled from "styled-components";

export const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const LeftSection = styled.div`
  flex: 1;
  padding: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-left: 8%;

  .text {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 39.52px;
    letter-spacing: 0.25px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  p {
    margin-top: 0;
    color: rgba(135, 138, 153, 1);
    font-size: 24px;
    font-weight: 400;
    line-height: 29.64px;
    letter-spacing: 0.25px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  Button {
    background-color: rgba(117, 57, 255, 1);
  }
  .signup-link {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.68px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    color: rgba(43, 43, 43, 1);

    a {
      color: #6c5ce7;
      font-size: 16px;
      font-weight: 600;
      line-height: 21.68px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration: none;
    }
  }
  .reset-link {
    margin-top: 3%;
    a {
      color: #6c5ce7;
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      text-underline-position: from-font;
      text-decoration: none;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RememberMe = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;
