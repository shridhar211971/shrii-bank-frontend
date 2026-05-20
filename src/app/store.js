import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import accountReducer from "../features/account/accountSlice";

import transactionReducer from "../features/transaction/transactionSlice";

import profileReducer from "../features/profile/profileSlice";

import auditorReducer from "../features/auditor/auditorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    account: accountReducer,

    transaction: transactionReducer,

    profile: profileReducer,

    auditor: auditorReducer,
  },
});