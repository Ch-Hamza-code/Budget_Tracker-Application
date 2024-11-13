import styled from 'styled-components';
import { Dialog } from '@mui/material';



export const DialogBoxStyled = styled(Dialog)`

MuiPaper-root {
    border-radius: 12px;
    padding: 20px;
    max-width: 400px;
  }

  .MuiDialogTitle-root {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
  }

  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 20px;
  }

  .MuiTextField-root {
    width: 100%;

    .MuiInputBase-root {
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #e0e0e0;
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

  .MuiButton-root {
    font-weight: 500;
    border-radius: 8px;
    padding: 8px 16px;
  }

  .MuiButton-containedPrimary {
    width: 27%;
    color: #fff;
  }

  .MuiButton-containedPrimary:hover {
    background-color: #5a34a0;
  }

  .MuiButton-textSecondary {
    color: #6c757d;
  }

  .MuiButton-textSecondary:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }


  .text-2{
    margin-top: 2%;
    display: flex;
    align-content: space-between;
  }

  .t1{
    max-width: 50%;
    margin-right: 5%;
  }
  .t2{
    max-width: 50%;
    margin-left: 5%;
  }
  
`;
