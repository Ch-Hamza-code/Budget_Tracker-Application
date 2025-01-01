import styled from "styled-components";

export const UserContainerStyled = styled.div`
  display: flex;

  .UserTable {
    width: 100%;
  }

  .Table {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const UsersTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(221, 228, 240, 1);
  padding: 15px;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  height: 48px;
  top: 103px;
  left: 109px;
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
    background-color: rgba(117, 57, 255, 1);
    color: #fff;
    border: none;
    border-radius: 4px 0px 0px 0px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #5e35b1;
    }
  }
`;

export const TableWrapper2 = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  padding: 2px;
  background-color: #f5f8fa;

  border-radius: 8px;
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

  input[type="date"],
  input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;
