import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import Button from '../../../Components/Buttons/Button';
import { DialogBoxStyled } from './AddExpenseStyles';

interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  userEmail: string; // Add prop for userEmail
}

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ open, onClose, userEmail }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async () => {
    if (!title || !price || !date) {
      alert("Please fill in all fields.");
      return;
    }
    const profileEmail = localStorage.getItem("email")
    // Include userEmail in the expense data
    const expenseData = { 
      title, 
      price: parseFloat(price), // Convert price to a number
      date: new Date(date).toISOString(), // Ensure the date is in ISO format
      userEmail: profileEmail // Associate with current user
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve token if using JWT
      const response = await fetch('http://localhost:5000/api/expenses/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include authorization header
        },
        body: JSON.stringify(expenseData),
      });    

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Expense added successfully
        onClose(); // Close the dialog box
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DialogBoxStyled open={open} onClose={onClose}>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <div>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='text-2'>
            <div className='t1'>
          <TextField label="Price (PKR)" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
          </div>
          <div className='t2'>
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
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
      </DialogActions>
    </DialogBoxStyled>

  );
};

export default AddExpenseDialog;
