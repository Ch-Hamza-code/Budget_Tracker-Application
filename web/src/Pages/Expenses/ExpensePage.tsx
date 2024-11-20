import React, { useEffect, useState } from 'react';
import { columns } from './Expense.Types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import TableComponent from '../../Components/Table/Table';
import { ExpenseContainerStyled } from './Expense.Styles';
import Sidebar from '../../Components/SideBar/SideBar';
import Button from '../../Components/Buttons/Button';
import AddExpenseDialog from './AddExpense/AddExpense';
import axios from 'axios';
import { GET_EXPENSES, LOCAL_HOST } from '../../Constants/Urls';

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]); // Initialize as empty array
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem('userEmail') || '';

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in local storage
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass token in headers
        },
      });
      setExpenses(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (id: string) => {
    console.log('Edit expense with id:', id);
  };
 
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token if using JWT
      const response = await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        },
      });
      if (response.status === 200) {
        console.log('Expense deleted:', response.data.message);
        // Remove the expense from state
        setExpenses(expenses.filter(expense => expense._id !== id));
      } else {
        console.error('Error deleting expense:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchExpenses(); // Refresh expenses after adding a new one
  };

  const dataWithActions = expenses.map((expense) => ({
    ...expense,
    Actions: (
      <>
        <IconButton onClick={() => handleEdit(expense._id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(expense._id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }));

  return (
    
    <ExpenseContainerStyled>
      <Sidebar />
      <div className='ExpenseTable'>
        <div className="heading">
          <h1>EXPENSES</h1>
          <Button onClick={handleOpenDialog} type="button" variant="contained"> Add Expense </Button>
        </div>
        <div className="Table">
          <Typography variant="h6" sx={{ marginLeft: '16px' }}>Expenses</Typography>
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
