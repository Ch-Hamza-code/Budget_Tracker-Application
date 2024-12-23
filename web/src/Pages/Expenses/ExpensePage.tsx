import React, { useEffect, useState } from "react";
import { columns } from "./Expense.Types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, LinearProgress, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../Components/Table/Table";
import { ExpenseContainerStyled, ExpenseTableWrapper, Heading, TableWrapper } from "./Expense.Styles";
import Sidebar from "../../Components/SideBar/SideBar";
import Button from "../../Components/Buttons/Button";
import AddExpenseDialog from "./AddExpense/AddExpense";
import { deleteExpense, FetchExpenses } from "./Expense.service";
import DeleteExpenseDialog from "./DeleteExpense/DeleteExpense";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userEmail = localStorage.getItem("userEmail") || "";

  const fetchExpenses = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const data = await FetchExpenses(token, page, rowsPerPage);
      setExpenses(data.expenses || []);
      setTotalPages(data.pagination?.totalPages || 0);
    } catch (error: any) {
      console.error("Error fetching expenses:", error.message);
      toast.error("Failed to fetch expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handleEdit = (id: string) => {
    console.log("Edit expense with id:", id);
  };

  const handleDelete = async () => {
    if (!expenseToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      await deleteExpense(expenseToDelete._id, token);

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== expenseToDelete._id));

      setDeleteDialogOpen(false);

      toast.success("Expense deleted successfully!", {
        autoClose: 2000,
      });
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const handleOpenDeleteDialog = (expense: any) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setExpenseToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchExpenses(page, rowsPerPage);
    toast.success("Expense added successfully!", {
      autoClose: 2000,
    });
  };

  const dataWithActions = expenses.map((expense) => ({
    ...expense,
    Actions: (
      <div style={{ display: "flex", gap: "6px" }}>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleOpenDeleteDialog(expense)} title="Delete" sx={{ color: "#f44336" }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(expense._id)} title="Edit" sx={{ color: "#4caf50" }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  }));

  return (
    <ExpenseContainerStyled>
      <Sidebar />
      <ToastContainer />
      <ExpenseTableWrapper>
        <Heading>
          <h1>EXPENSES</h1>
          <Button onClick={handleOpenDialog} type="button" variant="contained">
            Add Expenses
          </Button>
        </Heading>

        <TableWrapper>
          <Typography variant="h6" sx={{ marginLeft: "16px" }}>
            Expenses
          </Typography>
          <div>Sort By</div>
          <select>
            <option value="">All</option>
            <option value="expenditure">Expenditure</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>

          <div>Date</div>
          <input type="date" />

          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </TableWrapper>
        {loading ? (
          <LinearProgress />
        ) : (
          <TableComponent
            columns={columns}
            data={dataWithActions}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            totalPages={expenses.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </ExpenseTableWrapper>
      <AddExpenseDialog open={isDialogOpen} onClose={handleCloseDialog} userEmail={userEmail} />
      <DeleteExpenseDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        expenseTitle={expenseToDelete?.title || ""}
      />
    </ExpenseContainerStyled>
  );
};

export default ExpensesPage;
