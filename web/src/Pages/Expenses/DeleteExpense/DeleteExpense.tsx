import React from "react";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../../../Components/Buttons/Button";
import { AddDialogBoxStyled } from "../AddExpense/AddExpenseStyles";
import { DeleteExpenseDialogProps } from "./DeleteExpense.Types";
import { deleteExpense } from "../Expense.service";
import { toast } from "react-toastify";

const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  open,
  onClose,
  expenseToDelete,
  refreshExpenses,
}) => {
  const handleDelete = async () => {
    if (!expenseToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }
      await deleteExpense(expenseToDelete._id, token);
      toast.success("Expense deleted successfully!", { autoClose: 2000 });
      refreshExpenses();
      onClose();
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  return (
    <AddDialogBoxStyled open={open} onClose={onClose}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <p>
          Are you sure you want to delete the expense <strong>{expenseToDelete?.title || ""}</strong>?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </AddDialogBoxStyled>
  );
};

export default DeleteExpenseDialog;
