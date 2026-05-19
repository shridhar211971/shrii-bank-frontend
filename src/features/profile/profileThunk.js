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