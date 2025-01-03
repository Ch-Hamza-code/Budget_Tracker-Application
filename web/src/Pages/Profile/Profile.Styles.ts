import styled from "styled-components";

export const ProfileContainerStyled = styled.div`
  margin-top: 2%;
  flex-grow: 1;
  display: flex;
  padding: 20px;

  .Main {
    width: 100%;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h5 {
      font-size: 24px;
      color: #333;
    }
  }

  .mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }

  .card {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .avatar {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
  }

  .about-me {
    margin-top: 16px;
    font-size: 14px;
    color: #666;
    text-align: justify;
  }

  .text-1 {
    margin-top: 3%;
    display: flex;
    gap: 2%;
  }
  .text-2 {
    margin-top: 1%;
    display: flex;
    gap: 2%;
  }
  .text-3 {
    margin-top: 1%;
    display: flex;
    gap: 2%;
  }
  .text-4 {
    margin-top: 1%;
    display: flex;
    gap: 2%;
  }
  .text-5 {
    margin-top: 1%;
    display: flex;
    gap: 2%;
  }
`;
