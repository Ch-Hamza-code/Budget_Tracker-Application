import styled from "styled-components";

export const AnalyticContainerStyled = styled.div`
  display: flex;
`;
export const AnalyticTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(221, 228, 240, 1);
  padding: 15px;
`;

export const Headingdiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5%;
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
export const TableWrapper3 = styled.div`
  margin-left: 0.5%;
  padding: 8px;
  background-color: white;
  justify-content: space-between;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 0.5%;
  margin-top: 10px;
  padding: 2px;
  background-color: #f5f8fa;
  justify-content: space-between;
  .header-items {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .select-any {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
  }
`;
