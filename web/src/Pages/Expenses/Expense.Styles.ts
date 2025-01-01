import styled from "styled-components";

export const ExpenseContainerStyled = styled.div`
  display: flex;
`;

export const ExpenseTableWrapper = styled.div`
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
  gap: 0px;
  opacity: 0px;

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

export const TableWrapper = styled.div`
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

export const StyledPagination = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

export const MuiStyles = {
  tableCell: {
    fontSize: "14px",
    color: "#555",
    padding: "12px 16px",
    "&:first-of-type": {
      fontWeight: "bold",
    },
  },
  tableHead: {
    backgroundColor: "#f9f9f9",
    "& .MuiTableCell-root": {
      fontSize: "15px",
      fontWeight: "600",
      color: "#333",
    },
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f7f7f7",
    },
    "&:hover": {
      backgroundColor: "#eaeaea",
    },
  },
};
