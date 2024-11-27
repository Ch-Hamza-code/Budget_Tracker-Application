import axios from "axios";
import { SignupFormInputs } from "./SignUp.types";
import { LOCAL_HOST, POST_SIGNUP } from "../../../Constants/Urls";

export const signup = async (data: SignupFormInputs) => {
  try {
    const response = await axios.post(`${LOCAL_HOST}${POST_SIGNUP}`, data);
    return response.data; // Return the response to the caller
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error signing up. Please try again.");
  }
};
