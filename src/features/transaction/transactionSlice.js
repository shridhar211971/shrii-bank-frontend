import { createSlice } from "@reduxjs/toolkit";

import {
  getTransactions,
  transferMoney,
} from "./transactionThunk";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions =
          action.payload?.data || [];
      })

      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(transferMoney.pending, (state) => {
        state.loading = true;
      })

      .addCase(transferMoney.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(transferMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default transactionSlice.reducer;