import axios from "axios";
import { DELETE_EXP, GET_EXP, LOCAL_HOST } from "../../Constants/Urls";

export const deleteExpense = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${LOCAL_HOST}${DELETE_EXP}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error deleting expense");
  }
};

export const FetchExpenses = async (token: string) => {
  try {
    const response = await axios.get(`${LOCAL_HOST}${GET_EXP}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the fetched data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching expenses");
  }
};
