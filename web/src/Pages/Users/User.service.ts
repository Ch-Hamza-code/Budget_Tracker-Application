import axios from "axios";
import { DELETE_USER, FETCH_USERS, LOCAL_HOST, PUT_USER } from "../../Constants/Urls";

export const FetchUsers = async () => {
  try {
    const response = await fetch(`${LOCAL_HOST}${FETCH_USERS}`);
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return await response.json(); // Return the fetched users
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch users.");
  }
};

export const DeleteUser = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${LOCAL_HOST}${DELETE_USER}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting user.");
  }
};

export const UpdateUser = async (email: string, userData: any) => {
  try {
    const response = await axios.put(`${LOCAL_HOST}${PUT_USER}${email}`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // Return the updated user data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating user.");
  }
};
