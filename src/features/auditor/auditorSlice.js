// auditorSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

// =========================
// THUNKS
// =========================

// Get Totals
export const getAuditTotals = createAsyncThunk(
  "auditor/getAuditTotals",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        ENDPOINTS.AUDITOR.TOTALS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch audit totals"
      );
    }
  }
);

// =========================
// GET ALL USERS
// =========================

export const getAllUsers = createAsyncThunk(
  "auditor/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        ENDPOINTS.AUDITOR.ALL_USERS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

// Find User By Email
export const findUserByEmail = createAsyncThunk(
  "auditor/findUserByEmail",
  async (email, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        `${ENDPOINTS.AUDITOR.FIND_USER}?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch user"
      );
    }
  }
);

// Find Account By Account Number
export const findAccountByNumber = createAsyncThunk(
  "auditor/findAccountByNumber",
  async (accountNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        `${ENDPOINTS.AUDITOR.FIND_ACCOUNT}?accountNumber=${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch account"
      );
    }
  }
);

// Get Transactions By Account Number
export const getTransactionsByAccount = createAsyncThunk(
  "auditor/getTransactionsByAccount",
  async (accountNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        `/audit/transactions/by-account?accountNumber=${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

// Get Transaction By ID
export const getTransactionById = createAsyncThunk(
  "auditor/getTransactionById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        `/audit/transactions/by-id?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch transaction"
      );
    }
  }
);

// =========================
// INITIAL STATE
// =========================

const initialState = {
  totals: {},

  users: [],

  user: null,

  account: null,

  transactions: [],

  transaction: null,

  loading: false,

  error: null,
};

// =========================
// SLICE
// =========================

const auditorSlice = createSlice({
  name: "auditor",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearUsers: (state) => {
      state.users = [];
    },

    clearUser: (state) => {
      state.user = null;
    },

    clearAccount: (state) => {
      state.account = null;
    },

    clearTransactions: (state) => {
      state.transactions = [];
    },

    clearTransaction: (state) => {
      state.transaction = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET TOTALS
      // =========================

      .addCase(getAuditTotals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAuditTotals.fulfilled, (state, action) => {
        state.loading = false;
        state.totals = action.payload?.data || action.payload || {};
      })

      .addCase(getAuditTotals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     // =========================
      // GET ALL USERS
      // =========================

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users =
          action.payload?.data?.content || [];
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // FIND USER
      // =========================

      .addCase(findUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(findUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || action.payload || null;
      })

      .addCase(findUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // FIND ACCOUNT
      // =========================

      .addCase(findAccountByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(findAccountByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload?.data || action.payload || null;
      })

      .addCase(findAccountByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // GET TRANSACTIONS
      // =========================

      .addCase(getTransactionsByAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTransactionsByAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions =
          action.payload?.data || action.payload || [];
      })

      .addCase(getTransactionsByAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // GET TRANSACTION BY ID
      // =========================

      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction =
          action.payload?.data || action.payload || null;
      })

      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearUsers,
  clearUser,
  clearAccount,
  clearTransactions,
  clearTransaction,
} = auditorSlice.actions;

export default auditorSlice.reducer;