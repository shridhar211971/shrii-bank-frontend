import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "../../api/axois";

import ENDPOINTS from "../../api/endpoints";

// GET TRANSACTIONS

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",

  async (
    {
      page = 1,
      size = 10,
    } = {},
    thunkAPI
  ) => {

    try {

      const accountNumber =
        sessionStorage.getItem(
          "accountNumber"
        );

      const response =
        await axiosInstance.get(
          `${ENDPOINTS.TRANSACTIONS.ALL}/${accountNumber}?page=${page}&size=${size}`
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch transactions"
      );

    }
  }
);

// TRANSFER

export const transferMoney = createAsyncThunk(
  "transaction/transferMoney",

  async (data, thunkAPI) => {

    try {

      const payload = {

        transactionType: "TRANSFER",

        amount: data.amount,

        accountNumber:
          data.accountNumber,

        destinationAccountNumber:
          data.destinationAccountNumber,

        description:
          data.description,
      };

       

      const response =
        await axiosInstance.post(
          ENDPOINTS.TRANSACTIONS.TRANSFER,
          payload
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Transfer failed"
      );

    }
  }
);

// WITHDRAW

export const withdrawMoney = createAsyncThunk(
  "transaction/withdrawMoney",

  async (data, thunkAPI) => {

    try {

      const payload = {

        transactionType:
          "WITHDRAWAL",

        amount: data.amount,

        accountNumber:
          data.accountNumber,

        description:
          data.description,
      };

      const response =
        await axiosInstance.post(
          ENDPOINTS.TRANSACTIONS.TRANSFER,
          payload
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Withdraw failed"
      );

    }
  }
);

const initialState = {

  transactions: [],

  meta: {
    totalItems: 0,
    pageSize: 10,
    totalPages: 0,
    currentPage: 1,
  },

  loading: false,

  error: null,
};

const transactionSlice = createSlice({

  name: "transaction",

  initialState,

  reducers: {

    clearError: (state) => {

      state.error = null;

    },
  },

  extraReducers: (builder) => {

    builder

      // GET

      .addCase(
        getTransactions.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getTransactions.fulfilled,
        (state, action) => {

          state.loading = false;

          state.transactions =
            action.payload?.data || [];

          state.meta =
            action.payload?.meta ||
            initialState.meta;

        }
      )

      .addCase(
        getTransactions.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )

      // TRANSFER

      .addCase(
        transferMoney.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        transferMoney.fulfilled,
        (state) => {

          state.loading = false;

        }
      )

      .addCase(
        transferMoney.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )

      // WITHDRAW

      .addCase(
        withdrawMoney.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        withdrawMoney.fulfilled,
        (state) => {

          state.loading = false;

        }
      )

      .addCase(
        withdrawMoney.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );

  },
});

export const {
  clearError,
} = transactionSlice.actions;

export default transactionSlice.reducer;