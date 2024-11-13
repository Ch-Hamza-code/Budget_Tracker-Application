import styled from 'styled-components';

export const UserContainerStyled = styled.div`
 flex-grow: 1;
  display: flex;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    margin-left: 186px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .UserTable{
        width: 100%;
    }
  
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 24px;
    color: #333;
  }
 

  .Table {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
