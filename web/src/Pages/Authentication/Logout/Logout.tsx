import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "../../../Components/Buttons/Button";

const Logout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setOpen(true);
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to log out?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} type="submit" variant="contained">
          No
        </Button>
        <Button onClick={handleLogout} type="submit" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
