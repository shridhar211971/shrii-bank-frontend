const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  USERS: {
    PROFILE: "/users/me",
    UPDATE_PASSWORD: "/users/update-password",
    UPLOAD_PROFILE: "/users/profile-picture",
  },

  ACCOUNTS: {
    MY_ACCOUNTS: "/accounts/me",
  },

  TRANSACTIONS: {
    ALL: "/transactions",
    TRANSFER: "/transactions/transfer",
  },

  AUDITOR: {
    TOTALS: "/audit/totals",
    FIND_USER: "/audit/users",
    FIND_ACCOUNT: "/audit/accounts",
  },
};

export default ENDPOINTS;