import React, { useState } from "react";
import { Button, LinearProgress, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Heading, TableWrapper2, UserContainerStyled, UsersTableWrapper } from "./Users.Styles";
import Sidebar from "../../Components/SideBar/SideBar";
import TableComponent from "../../Components/Table/Table";
import { columns } from "./Users.Types";
import { DeleteUser, fetchUser, UpdateUser } from "./User.service";
import useSWR from "swr";
import EditUserDialog from "./EditUser/EditUser";
import { FETCH_USERS, LOCAL_HOST } from "../../Constants/Urls";
import MenuAppBar from "../../Components/AppBar/Appbar";

const UserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const role = localStorage.getItem("role");

  const { data, error, isLoading } = useSWR(
    `${LOCAL_HOST}${FETCH_USERS}?page=${page}&rowsPerPage=${rowsPerPage}`,
    fetchUser,
  );

  const handleChangePage = (newPage: number) => {
    if (newPage < (data?.pagination?.totalPages || 0)) {
      setPage(newPage + 1);
    }
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);

    setPage(1);
  };

  const handleEdit = (email: string) => {
    const user = data?.users.find((u: any) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setOpenDialog(true);
    } else {
      console.error("User not found with email:", email);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!_id) return console.error("User ID is undefined in handleDelete");
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("User is not authenticated.");
      const response = await DeleteUser(_id, token);
      console.log("User deleted successfully:", response.message);

      setPage(1);
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (updatedUser: any) => {
    try {
      const updatedUserData = await UpdateUser(currentUser.email, updatedUser);
      console.log("User updated successfully:", updatedUserData);
      setPage(1);
      setOpenDialog(false);
    } catch (error: any) {
      console.error("Error updating user:", error.message);
      alert(error.message);
    }
  };

  const dataWithActions = (data?.users || []).map((user: any) => ({
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
    <>
      <MenuAppBar />
      <UserContainerStyled>
        <Sidebar />
        <UsersTableWrapper>
          <Heading>
            <h1>Users</h1>
            {role === "admin" && (
              <Button type="button" variant="contained">
                Add User
              </Button>
            )}
          </Heading>
          <TableWrapper2>
            <Typography variant="h6" sx={{ marginLeft: "16px" }}>
              Users
            </Typography>
            <div className="header-items">
              <p>Sort By</p>
              <select className="select-any">
                <option value="">All</option>
                <option value="expenditure">Expenditure</option>
                <option value="price">Price</option>
                <option value="date">Date</option>
              </select>
              <div>
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </TableWrapper2>
          <div>
            {isLoading ? (
              <LinearProgress />
            ) : error ? (
              <div>Error fetching users</div>
            ) : (
              <TableComponent
                columns={columns}
                data={dataWithActions}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                totalPages={data?.pagination.totalUsers || 0}
              />
            )}
          </div>
        </UsersTableWrapper>
        <EditUserDialog open={openDialog} user={currentUser} onClose={handleDialogClose} onSubmit={handleSubmit} />
      </UserContainerStyled>
    </>
  );
};

export default UserPage;
