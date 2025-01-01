import { format } from "date-fns";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "../../../Components/Buttons/Button";
import { AddDialogBoxStyled } from "./AddExpenseStyles";
import { AddExpenseDialogProps } from "./AddExpense.Types";
import { FETECH_EXP, LOCAL_HOST } from "../../../Constants/Urls";
import { DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ open, onClose, userEmail }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = async () => {
    if (!title || !price || !date) {
      toast.error("Please fill in all fields.");
      return;
    }

    const profileEmail = localStorage.getItem("email");
    const id = localStorage.getItem("userId");

    const formattedDate = format(new Date(date), "dd-MMM-yyyy");

    const expenseData = {
      title,
      price: parseFloat(price),
      date: formattedDate,
      userEmail: profileEmail,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${LOCAL_HOST}${FETECH_EXP}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          autoClose: 1000,
        });
        onClose();
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AddDialogBoxStyled open={open} onClose={onClose}>
      <DialogTitle>Add Expense</DialogTitle>
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
          <Button onClick={handleAdd} variant="outlined">
            Add
          </Button>
        </div>
      </DialogActions>
    </AddDialogBoxStyled>
  );
};

export default AddExpenseDialog;
