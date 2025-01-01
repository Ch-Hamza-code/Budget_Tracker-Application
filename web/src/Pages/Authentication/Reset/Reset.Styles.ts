import styled from "styled-components";

export const ResetContainer = styled.div`
  display: flex;
  min-height: 50vh;
  font-family: Arial, sans-serif;
  .logo-container {
    position: absolute;
    top: 20px;
    left: 115px;
  }

  .logo-image {
    width: 300px;
    height: auto;
  }

  .image {
    margin: 0 auto;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  padding: 150px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-left: 8%;

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
    font-size: 22px;
    font-weight: 400;
    line-height: 29.64px;
    letter-spacing: 0.25px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .Form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .input-row {
      display: flex;
      gap: 10px;

      > div {
        flex: 1;
      }
    }
  }

  Button {
    background-color: rgba(117, 57, 255, 1);
  }

  .reset-link {
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
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;

  img {
    max-width: 80%;
    height: auto;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
