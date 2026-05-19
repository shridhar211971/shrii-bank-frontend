import { createAsyncThunk } from "@reduxjs/toolkit";

import accountService from "./accountService";

export const getMyAccounts = createAsyncThunk(
  "account/getMyAccounts",

  async (_, thunkAPI) => {

    try {

      return await accountService.getMyAccounts();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch accounts"
      );
    }
  }
);