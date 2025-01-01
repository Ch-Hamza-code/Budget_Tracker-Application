import axios from "axios";
import { DELETE_EXP, GET_EXP, LOCAL_HOST, UPDATE_EXP } from "../../Constants/Urls";
import useSWR from "swr";

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

export const fetchExpenses = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useExpenses = (
  page: number,
  rowsPerPage: number,
  sortField: string = "date",
  sortOrder: string = "asc",
) => {
  const token = localStorage.getItem("token");

  const { data, error, isLoading, mutate } = useSWR(
    token
      ? `${LOCAL_HOST}${GET_EXP}?page=${page}&rowsPerPage=${rowsPerPage}&sortField=${sortField}&sortOrder=${sortOrder}`
      : null,
    (url) => fetchExpenses(url, token!),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );
  return {
    expenses: data?.expenses || [],
    totalPages: data?.pagination?.totalPages || 0,
    isLoading,
    error,
    mutate,
  };
};

export const updateExpense = async (
  id: string,
  updatedData: { title: string; price: string; date: string },
  token: string,
) => {
  try {
    const response = await axios.put(`${LOCAL_HOST}${UPDATE_EXP}${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error updating expense");
  }
};
