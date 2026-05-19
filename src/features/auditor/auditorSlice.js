import { createSlice } from "@reduxjs/toolkit";

import { getAuditTotals } from "./auditorThunk";

const initialState = {
  totals: {},
  loading: false,
  error: null,
};

const auditorSlice = createSlice({
  name: "auditor",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    builder

      .addCase(getAuditTotals.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAuditTotals.fulfilled, (state, action) => {
        state.loading = false;
        state.totals = action.payload?.data || action.payload || {};
      })

      .addCase(getAuditTotals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default auditorSlice.reducer;