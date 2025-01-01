import axios from "axios";
import { GET_ANALYTICEXPENSES, LOCAL_HOST } from "../../Constants/Urls";

export const FetchAnalyticExpenses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`${LOCAL_HOST}${GET_ANALYTICEXPENSES}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching expenses.");
  }
};
