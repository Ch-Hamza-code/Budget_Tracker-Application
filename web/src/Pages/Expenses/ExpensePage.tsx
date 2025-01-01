import React, { useState } from "react";
import { columns } from "./Expense.Types";
import "react-toastify/dist/ReactToastify.css";
import { useExpenses } from "./Expense.service";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Buttons/Button";
import AddExpenseDialog from "./AddExpense/AddExpense";
import Sidebar from "../../Components/SideBar/SideBar";
import TableComponent from "../../Components/Table/Table";
import { CustomEditIcon } from "../../Icons/EditIcon";
import MenuAppBar from "../../Components/AppBar/Appbar";
import EditExpenseDialog from "./EditExpense/EditExpense";
import { CustomdeleteIcon } from "../../Icons/deleteIcon";
import DeleteExpenseDialog from "./DeleteExpense/DeleteExpense";
import { IconButton, LinearProgress, Tooltip, Typography } from "@mui/material";
import { ExpenseContainerStyled, ExpenseTableWrapper, Heading, TableWrapper } from "./Expense.Styles";

const ExpensesPage: React.FC = () => {
  const [expenseToEdit, setExpenseToEdit] = useState<any>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const userEmail = localStorage.getItem("userEmail") || "";

  const { expenses, totalPages, isLoading, mutate } = useExpenses(page, rowsPerPage, sortField, sortOrder);

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
    mutate();
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleOpenEditDialog = (expense: any) => {
    setExpenseToEdit(expense);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setExpenseToEdit(null);
    setEditDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const filteredExpenses = expenses.filter((expense: { title: string }) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const dataWithActions = filteredExpenses.map((expense: { _id: string; price: number; date: string }) => ({
    ...expense,
    price: formatPrice(expense.price),
    date: formatDate(expense.date),
    Actions: (
      <div style={{ display: "flex", gap: "6px" }}>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleOpenDeleteDialog(expense)} title="Delete" sx={{ padding: "8px" }}>
            <CustomdeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleOpenEditDialog(expense)} title="Edit" sx={{ padding: "8px" }}>
            <CustomEditIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  }));

  return (
    <>
      <MenuAppBar />
      <ExpenseContainerStyled>
        <Sidebar />
        <ToastContainer />
        <ExpenseTableWrapper>
          <Heading>
            <h1>Expenses</h1>
            <Button onClick={handleOpenDialog} type="button" variant="contained">
              Add Expenses
            </Button>
          </Heading>

          <TableWrapper>
            <Typography variant="h6" sx={{ marginLeft: "16px" }}>
              Expenses
            </Typography>
            <div className="header-items">
              <p>Sort By</p>
              <select className="select-any" value={sortField} onChange={(e) => handleSortChange(e.target.value)}>
                <option>All</option>
                <option value="date">Date: Newest to oldest</option>
                <option value="price">Price: Highest to lowest</option>
              </select>
              <div>Date</div>
              <input type="date" />
              <div>
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </TableWrapper>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <TableComponent
              columns={columns}
              data={dataWithActions}
              page={page - 1}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage + 1)}
              onRowsPerPageChange={(newRowsPerPage) => {
                setRowsPerPage(newRowsPerPage);
                setPage(1);
              }}
            />
          )}
        </ExpenseTableWrapper>
        <AddExpenseDialog open={isDialogOpen} onClose={handleCloseDialog} userEmail={userEmail} />
        <DeleteExpenseDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          expenseToDelete={expenseToDelete}
          refreshExpenses={() => mutate()}
        />
        <EditExpenseDialog
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          expenseToEdit={expenseToEdit}
          refreshExpenses={() => mutate()}
        />
      </ExpenseContainerStyled>
    </>
  );
};

export default ExpensesPage;
