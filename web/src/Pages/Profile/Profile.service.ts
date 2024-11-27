import axios from "axios";
import { ProfileDataType } from "./Profile.types";
import { ADD_ACCOUNT, LOCAL_HOST } from "../../Constants/Urls";

export const getProfile = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const UpdateAccount = async (accountData: ProfileDataType, token: string) => {
  try {
    const response = await axios.post(`${LOCAL_HOST}${ADD_ACCOUNT}`, accountData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the response data to the caller
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating account.");
  }
};
