import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

import {
  setToken,
  setRoles,
  setUserInfo,
  clearStorage,
  getToken,
  getRoles,
  getUserInfo,
} from "../../utils/token";

// LOGIN

export const loginUser = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {

    try {

      const response = await axiosInstance.post(
        ENDPOINTS.AUTH.LOGIN,
        userData
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  }
);

// REGISTER

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI) => {

    try {

      const response = await axiosInstance.post(
        ENDPOINTS.AUTH.REGISTER,
        userData
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  }
);

// FORGOT PASSWORD

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (userData, thunkAPI) => {

    try {

      const response = await axiosInstance.post(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        userData
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Request failed"
      );

    }
  }
);

// RESET PASSWORD

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async (userData, thunkAPI) => {

    try {

      const response = await axiosInstance.post(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        userData
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Reset failed"
      );

    }
  }
);

const initialState = {

  user: getUserInfo(),

  token: getToken() || null,

  roles: getRoles(),

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

      state.token = getToken();

      state.roles = getRoles();

      state.user = getUserInfo();

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

        const data =
          action.payload?.data ||
          action.payload;

        // STORE IN REDUX

        state.token = data?.token || null;

        state.roles = data?.roles || [];

        state.user = {
          firstName:
            data?.firstName ||
            data?.user?.firstName ||
            "",

          lastName:
            data?.lastName ||
            data?.user?.lastName ||
            "",

          email:
            data?.email ||
            data?.user?.email ||
            "",
        };

        // STORE IN LOCAL STORAGE

        if (data?.token) {
          setToken(data.token);
        }

        if (data?.roles) {
          setRoles(data.roles);
        }

        setUserInfo({
          firstName:
            data?.firstName ||
            data?.user?.firstName,

          lastName:
            data?.lastName ||
            data?.user?.lastName,

          email:
            data?.email ||
            data?.user?.email,
        });
      })

      .addCase(loginUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      // REGISTER

      .addCase(registerUser.pending, (state) => {

        state.loading = true;

      })

      .addCase(registerUser.fulfilled, (state) => {

        state.loading = false;

        state.success = true;

      })

      .addCase(registerUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      // FORGOT PASSWORD

      .addCase(forgotPassword.pending, (state) => {

        state.loading = true;

      })

      .addCase(forgotPassword.fulfilled, (state) => {

        state.loading = false;

      })

      .addCase(forgotPassword.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      // RESET PASSWORD

      .addCase(resetPassword.pending, (state) => {

        state.loading = true;

      })

      .addCase(resetPassword.fulfilled, (state) => {

        state.loading = false;

      })

      .addCase(resetPassword.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });

  },
});

export const {

  logout,
  clearError,
  initializeAuth,

} = authSlice.actions;

export default authSlice.reducer;