import { createAsyncThunk } from "@reduxjs/toolkit";

import auditorService from "./auditorService";

export const getAuditTotals = createAsyncThunk(
  "auditor/getAuditTotals",

  async (_, thunkAPI) => {

    try {
      return await auditorService.getAuditTotals();
    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch audit totals"
      );
    }
  }
);