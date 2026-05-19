import axiosInstance from "../../api/axois";

import ENDPOINTS from "../../api/endpoints";

const getMyAccounts = async () => {

  const response = await axiosInstance.get(
    ENDPOINTS.ACCOUNTS.MY_ACCOUNTS
  );

  return response.data;
};

const accountService = {
  getMyAccounts,
};

export default accountService;