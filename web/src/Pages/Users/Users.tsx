import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  LinearProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import TableComponent from '../../Components/Table/Table';
import Sidebar from '../../Components/SideBar/SideBar';
import { columns } from './Users.Types';
import { UserContainerStyled } from './Users.Styles';
import axios from 'axios';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' });

  const role = localStorage.getItem('role'); // Get user role from localStorage

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle edit button click
  const handleEdit = (email: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      setCurrentUser(user);
      setOpenDialog(true);
    } else {
      console.error('User not found with email:', email);
    }
  };

  const handleDelete = async (_id: any) => {
    if (!_id) {
        console.error("User email is undefined in handleDelete");
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:5000/api/users/_id/${_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
            console.log('User deleted successfully:', response.data.message);
            setUsers(users.filter(user => user._id !== _id));
        } else {
            console.error('Error deleting user:', response.data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    fetchUsers();
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Current User:", currentUser);  // Check if currentUser is set correctly
    console.log("User ID:", currentUser?.email);  // Ensure email is accessible
  
    if (!currentUser?.email) {
      alert('Email is missing!');
      return;
    }
  
    // Check if the email is already taken by another user
    if (userData.email !== currentUser.email) {
      const emailExists = users.some((user) => user.email === userData.email);
      if (emailExists) {
        alert('Email already exists. Please choose another one.');
        return;
      }
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${currentUser.email}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        const updatedUser = response.data;
        console.log('User updated successfully:', updatedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
        );
        setOpenDialog(false);
      } else {
        console.error('Failed to update user');
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again later.');
    }
    fetchUsers();
  };


  const dataWithActions = users.map((user) => ({
    ...user,
    Actions: role === 'admin' && (
      <>
        <IconButton onClick={() => handleEdit(user.email)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(user._id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }));

  return (
    <UserContainerStyled>
      <Sidebar />
      <div className="UserTable">
        <div className="heading">
          <h1>USERS</h1>
          {role === 'admin' && (
            <Button type="button"  variant="contained">
              Add User
            </Button>
          )}
        </div>
        <div className="Table">
          <Typography variant="h6"  sx={{ marginLeft: '16px' }}>
            Users
          </Typography>
          {loading ? (
            <LinearProgress />
          ) : (
            <TableComponent columns={columns} data={dataWithActions} onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={userData.firstName}  onChange={handleFormChange} margin="normal" />
          <TextField  label="Last Name"  name="lastName" value={userData.lastName}  onChange={handleFormChange}    margin="normal" />
          <TextField  label="Email"  name="email"value={userData.email} onChange={handleFormChange}  margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </UserContainerStyled>
  );
};

export default UserPage;
