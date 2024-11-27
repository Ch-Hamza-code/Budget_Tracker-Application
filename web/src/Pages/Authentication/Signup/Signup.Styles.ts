// Signup.Styles.ts
import styled from "styled-components";

export const SignupContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .Form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
`;
