import styled from "styled-components";

export const ExpenseContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const ExpenseTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f5f8fa;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
    background-color: rgba(117, 57, 255, 1);
    color: #fff;
    text-transform: capitalize;
    &:hover {
      background-color: #5e35b1;
    }
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 0%;
  width: 1462px;
  height: 53px;
  top: 187px;
  left: 110px;
  border-radius: 7px 7px 0px 0px;
  border: 0px 0px 1px 0px;
  background-color: rgba(247, 247, 247, 1);
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
