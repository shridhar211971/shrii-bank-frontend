import { createSlice } from "@reduxjs/toolkit";

import { getMyAccounts } from "./accountThunk";

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getMyAccounts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload?.data || [];
      })

      .addCase(getMyAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default accountSlice.reducer;