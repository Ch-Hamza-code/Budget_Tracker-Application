import React, { useEffect, useState } from "react";
import { columns } from "./Expense.Types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, LinearProgress, Typography } from "@mui/material";
import TableComponent from "../../Components/Table/Table";
import { ExpenseContainerStyled } from "./Expense.Styles";
import Sidebar from "../../Components/SideBar/SideBar";
import Button from "../../Components/Buttons/Button";
import AddExpenseDialog from "./AddExpense/AddExpense";
import { deleteExpense, FetchExpenses } from "./Expense.service";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem("userEmail") || "";

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const data = await FetchExpenses(token);
      setExpenses(data);
    } catch (error: any) {
      console.error("Error fetching expenses:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit expense with id:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const result = await deleteExpense(id, token);
      console.log("Expense deleted:", result.message);

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error: any) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchExpenses();
  };

  const dataWithActions = expenses.map((expense) => ({
    ...expense,
    Actions: (
      <>
        <IconButton onClick={() => handleEdit(expense._id)} title="Edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(expense._id)} title="Delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }));

  return (
    <ExpenseContainerStyled>
      <Sidebar />
      <div className="ExpenseTable">
        <div className="heading">
          <h1>EXPENSES</h1>
          <Button onClick={handleOpenDialog} type="button" variant="contained">
            Add Expense
          </Button>
        </div>
        <div className="Table">
          <Typography variant="h6" sx={{ marginLeft: "16px" }}>
            Expenses
          </Typography>
        </div>
        {loading ? (
          <LinearProgress />
        ) : (
          <TableComponent columns={columns} data={dataWithActions} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <AddExpenseDialog open={isDialogOpen} onClose={handleCloseDialog} userEmail={userEmail} />
    </ExpenseContainerStyled>
  );
};

export default ExpensesPage;
