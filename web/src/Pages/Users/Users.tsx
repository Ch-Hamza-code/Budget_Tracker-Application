import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";
import TableComponent from "../../Components/Table/Table";
import Sidebar from "../../Components/SideBar/SideBar";
import { columns } from "./Users.Types";
import { UserContainerStyled } from "./Users.Styles";
import { DeleteUser, FetchUsers, UpdateUser } from "./User.service";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "" });

  const role = localStorage.getItem("role");

  const fetchUsers = async () => {
    try {
      const data = await FetchUsers();
      setUsers(data);
    } catch (error: any) {
      console.error("Failed to fetch users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      console.error("User not found with email:", email);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!_id) {
      console.error("User ID is undefined in handleDelete");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await DeleteUser(_id, token);
      console.log("User deleted successfully:", response.message);

      setUsers(users.filter((user) => user._id !== _id));
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    fetchUsers();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser?.email) {
      alert("Email is missing!");
      return;
    }
    if (userData.email !== currentUser.email) {
      const emailExists = users.some((user) => user.email === userData.email);
      if (emailExists) {
        alert("Email already exists. Please choose another one.");
        return;
      }
    }

    try {
      const updatedUser = await UpdateUser(currentUser.email, userData);
      console.log("User updated successfully:", updatedUser);

      setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));

      setOpenDialog(false);
    } catch (error: any) {
      console.error("Error updating user:", error.message);
      alert(error.message);
    }
  };
  const dataWithActions = users.map((user) => ({
    ...user,
    Actions: role === "admin" && (
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
          {role === "admin" && (
            <Button type="button" variant="contained">
              Add User
            </Button>
          )}
        </div>
        <div className="Table">
          <Typography variant="h6" sx={{ marginLeft: "16px" }}>
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
          <TextField
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField label="Email" name="email" value={userData.email} onChange={handleFormChange} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </UserContainerStyled>
  );
};

export default UserPage;
