import axios from "axios";
import { DELETE_USER, LOCAL_HOST, PUT_USER } from "../../Constants/Urls";

export const DeleteUser = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${LOCAL_HOST}${DELETE_USER}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting user.");
  }
};

export const UpdateUser = async (email: string, userData: any) => {
  try {
    const response = await axios.put(`${LOCAL_HOST}${PUT_USER}${email}`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating user.");
  }
};

export const fetchUser = (url: string) => fetch(url).then((res) => res.json());
