import styled from 'styled-components';


export const ProfileContainerStyled = styled.div`
flex-grow: 1;
  display: flex;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    margin-left: 186px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
.Main{
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
`;
