import axios from "axios";
import { ProfileDataType } from "../Pages/Profile/Profile.types";
import { ADD_ACCOUNT, LOCAL_HOST } from "../Constants/Urls";

export const getProfile = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile data:", error.message);
    throw error;
  }
};

export const UpdateAccount = async (accountData: ProfileDataType, token: string) => {
  try {
    const response = await axios.post(`${LOCAL_HOST}${ADD_ACCOUNT}`, accountData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating account.");
  }
};
