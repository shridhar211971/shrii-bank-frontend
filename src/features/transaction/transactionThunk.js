import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",

  async (_, thunkAPI) => {

    try {
      return await transactionService.getTransactions();
    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch transactions"
      );
    }
  }
);

export const transferMoney = createAsyncThunk(
  "transaction/transferMoney",

  async (data, thunkAPI) => {

    try {
      return await transactionService.transferMoney(data);
    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Transfer failed"
      );
    }
  }
);