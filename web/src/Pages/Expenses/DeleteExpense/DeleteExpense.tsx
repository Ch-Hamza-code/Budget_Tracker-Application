import React from "react";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../../../Components/Buttons/Button";
import { DialogBoxStyled } from "../AddExpense/AddExpenseStyles";
import { DeleteExpenseDialogProps } from "./DeleteExpense.Types";

const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({ open, onClose, onConfirm, expenseTitle }) => {
  return (
    <DialogBoxStyled open={open} onClose={onClose}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <p>
          Are you sure you want to delete the expense <strong>{expenseTitle}</strong>?{" "}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </DialogBoxStyled>
  );
};

export default DeleteExpenseDialog;
