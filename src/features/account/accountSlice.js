import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "../../api/axois";

import ENDPOINTS from "../../api/endpoints";

// GET MY ACCOUNTS

export const getMyAccounts = createAsyncThunk(
  "account/getMyAccounts",

  async (_, thunkAPI) => {

    try {

      const response = await axiosInstance.get(
        ENDPOINTS.ACCOUNTS.MY_ACCOUNTS
      );

      // STORE USER INFO IN SESSION STORAGE

      const account =
        response.data?.data?.[0];

      if (account?.user) {

        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: account.user.id,
            firstName:
              account.user.firstName,
            lastName:
              account.user.lastName,
            email:
              account.user.email,
            roles:
              account.user.roles,
          })
        );
      }

      // STORE ACCOUNT NUMBER

      sessionStorage.setItem(
        "accountNumber",
        account?.accountNumber || ""
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch accounts"
      );

    }
  }
);

const initialState = {

  accounts: [],

  loading: false,

  error: null,
};

const accountSlice = createSlice({

  name: "account",

  initialState,

  reducers: {

    clearError: (state) => {

      state.error = null;

    },
  },

  extraReducers: (builder) => {

    builder

      .addCase(
        getMyAccounts.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getMyAccounts.fulfilled,
        (state, action) => {

          state.loading = false;

          state.accounts =
            action.payload?.data ||
            action.payload ||
            [];

        }
      )

      .addCase(
        getMyAccounts.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      );

  },
});

export const { clearError } =
  accountSlice.actions;

export default accountSlice.reducer;