import axios from "axios";
import { FormInputs } from "./Login.types";
import { LOCAL_HOST, POST_LOGIN } from "../../../Constants/Urls";

export const login = async (data: FormInputs) => {
  try {
    const response = await axios.post(`${LOCAL_HOST}${POST_LOGIN}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error logging in. Please try again.");
  }
};

export const storeuser = (response: any) => {
  localStorage.setItem("token", response.token);
  localStorage.setItem("email", response.profile?.email || "");
  localStorage.setItem("userId", response.profile?.id || "");
  localStorage.setItem("role", response.profile?.role || "");
};
