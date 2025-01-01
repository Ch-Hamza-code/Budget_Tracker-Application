import styled from "styled-components";

export const AnalyticContainerStyled = styled.div`
  display: flex;
  padding: 5px;

  .UserTable {
    width: 100%;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .Table {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Headingdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  height: 48px;
  top: 103px;
  left: 109px;
  gap: 0px;
  opacity: 0px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }
`;
