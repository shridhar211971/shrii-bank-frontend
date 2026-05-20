import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axois";

import ENDPOINTS from "../../api/endpoints";

// GET PROFILE

export const getProfile = createAsyncThunk(
  "profile/getProfile",

  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USERS.PROFILE);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// UPDATE PASSWORD

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",

  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.USERS.UPDATE_PASSWORD,
        data,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update password",
      );
    }
  },
);

// UPLOAD PROFILE PHOTO

export const uploadProfilePhoto = createAsyncThunk(
  "profile/uploadProfilePhoto",

  async (file, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axiosInstance.put(
        ENDPOINTS.USERS.UPLOAD_PROFILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // REFRESH PROFILE

      thunkAPI.dispatch(getProfile());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload photo",
      );
    }
  },
);

const initialState = {
  profile: null,

  loading: false,

  error: null,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET PROFILE

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload?.data || action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPDATE PASSWORD

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPLOAD PHOTO

      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
      })

      .addCase(uploadProfilePhoto.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { clearError } = profileSlice.actions;

export default profileSlice.reducer;
