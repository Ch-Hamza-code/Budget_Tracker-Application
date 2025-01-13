import styled from "styled-components";
import { Dialog } from "@mui/material";

export const AddDialogBoxStyled = styled(Dialog)`
  .MuiDialogTitle-root {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 20px;
  }

  .MuiTextField-root {
    margin-top: 2%;
    width: 100%;

    .MuiInputBase-root {
      border-radius: 8px;
      background-color: rgba(221, 228, 240, 1);
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #a0a0a0;
    }
  }

  .MuiDialogActions-root {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }

  .MuiButton-containedPrimary:hover {
    background-color: #5a34a0;
  }

  .MuiButton-textSecondary:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .text-2 {
    margin-top: 2%;
    display: flex;
    gap: 0%;
  }

  .t1 {
    max-width: 50%;
    margin-right: 5%;
  }
  .t2 {
    max-width: 50%;
    margin-left: 5%;
  }
  .dailog-buttons {
    display: flex;
    gap: 20%;
  }
  .dailog-buttons Button {
    width: 12rem;
    font-weight: 500;
    border-radius: 8px;
    padding: 8px 16px;
  }
  Button:hover {
    background-color: rgba(117, 57, 255, 1);
    color: white;
  }
`;
