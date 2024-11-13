import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, LinearProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import TableComponent from '../../Components/Table/Table';
import Sidebar from '../../Components/SideBar/SideBar';
import { columns } from './Users.Types';
import { UserContainerStyled } from './Users.Styles';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userData, setUserData] = useState({firstName: '', lastName: '', email: '', });

  useEffect(() => {
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
    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    console.log("handleEdit called with userId:", userId);
    const user = users.find((u) => u._id === userId);
    if (user) {
      console.log("User found:", user); // Log the found user object
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      setCurrentUser(user); // Ensure currentUser is set with a complete user object
      setOpenDialog(true);
    } else {
      console.error("User not found with ID:", userId);
    }
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user with id:', userId);
    // Add delete logic here
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


    const handleSubmit = async () => {
      if (!currentUser || !currentUser._id) {
        console.error("No user ID found for current user.");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          const updatedUser = await response.json();
          console.log("User updated successfully:", updatedUser);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === updatedUser._id ? updatedUser : user
            )
          );
          setOpenDialog(false);
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

  const dataWithActions = users.map((user) => ({
    ...user,
    Actions: (
      <>
        <IconButton onClick={() => handleEdit(user._id)}>
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
        </div>
        <div className="Table">
          <Typography variant="h6" sx={{ marginLeft: '16px' }}>Users</Typography>
          {loading ? (
            <LinearProgress />
          ) : (
            <TableComponent columns={columns} data={dataWithActions} onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </div>

      {/* Edit User Dialog */}
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
