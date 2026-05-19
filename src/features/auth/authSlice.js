import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";
import { setToken, setRoles, clearStorage, getToken } from "../../utils/token";

const initialState = {
  user: null,
  token: getToken() || null,
  roles: [],
  loading: false,
  success: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      clearStorage();
    },

    clearError: (state) => {
      state.error = null;
    },

    initializeAuth: (state) => {
      const token = getToken();
      if (token) {
        state.token = token;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Handle both direct response and nested data structure
        const data = action.payload?.data || action.payload;

        state.token = data?.token || null;
        state.user = data?.user || null;
        state.roles = data?.roles || [];

        // Persist token and roles to localStorage
        if (data?.token) {
          setToken(data.token);
        }
        if (data?.roles) {
          setRoles(data.roles);
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Handle both direct response and nested data structure
        const data = action.payload?.data || action.payload;

        // If registration returns token/user, save them
        if (data?.token) {
          state.token = data.token;
          setToken(data.token);
        }
        if (data?.user) {
          state.user = data.user;
        }
        if (data?.roles) {
          state.roles = data.roles;
          setRoles(data.roles);
        }
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, initializeAuth } = authSlice.actions;

export default authSlice.reducer;