import { LOCAL_HOST, RESET_PASSWORD, VERIFY_EMAIL } from "../Constants/Urls";
import axios from "axios";

export const verifyEmail = async (email: string) => {
  const response = await axios.post(`${LOCAL_HOST}${VERIFY_EMAIL}`, { email });
  return response.data;
};

export const resetPassword = async (email: string, newPassword: string) => {
  const response = await axios.post(`${LOCAL_HOST}${RESET_PASSWORD}`, { email, newPassword });
  return response.data;
};
