import { createAsyncThunk } from "@reduxjs/toolkit";

import profileService from "./profileService";

export const getProfile = createAsyncThunk(
  "profile/getProfile",

  async (_, thunkAPI) => {

    try {
      return await profileService.getProfile();
    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch profile"
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (data, thunkAPI) => {
    try {
      return await profileService.updatePassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to update password"
      );
    }
  }
);