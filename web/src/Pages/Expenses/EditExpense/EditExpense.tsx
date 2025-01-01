import React, { useState, useEffect } from "react";
import { DialogActions, DialogContent, DialogTitle, TextField, Button, ButtonBase } from "@mui/material";
import { toast } from "react-toastify";
import { EditExpenseDialogProps } from "./EditTypes";
import { updateExpense } from "../Expense.service";
import { EditDialogBoxStyled } from "./EditExpeseStyles";

const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({ open, onClose, expenseToEdit, refreshExpenses }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.price);
      setDate(expenseToEdit.date.split("T")[0]);
    }
  }, [expenseToEdit]);

  const handleSave = async () => {
    if (!title || !price || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      const updatedExpense = { title, price, date };
      const response = await updateExpense(expenseToEdit._id, updatedExpense, token);
      toast.success(response.message || "Expense updated successfully");
      onClose();
      refreshExpenses();
    } catch (error: any) {
      toast.error(error.message || "Failed to update expense");
    }
  };

  return (
    <EditDialogBoxStyled open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <div>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="text-2">
          <div className="t1">
            <TextField label="Price (PKR)" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
          </div>
          <div className="t2">
            <TextField
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="dailog-buttons">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="outlined">
            Save Changes
          </Button>
        </div>
      </DialogActions>
    </EditDialogBoxStyled>
  );
};

export default EditExpenseDialog;
