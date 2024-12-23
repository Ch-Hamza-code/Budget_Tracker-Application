import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { EditUserDialogProps } from "./EditUser.Types";

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, user, onClose, onSubmit }) => {
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    if (user) {
      setUserData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    }
  }, [user]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (!userData.email) {
      alert("Email is missing!");
      return;
    }
    onSubmit(userData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
