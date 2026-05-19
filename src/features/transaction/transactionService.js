import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

const getTransactions = async () => {

  const response = await axiosInstance.get(
    ENDPOINTS.TRANSACTION.ALL
  );

  return response.data;
};

const transferMoney = async (data) => {

  const response = await axiosInstance.post(
    ENDPOINTS.TRANSACTION.TRANSFER,
    data
  );

  return response.data;
};

const transactionService = {
  getTransactions,
  transferMoney,
};

export default transactionService;