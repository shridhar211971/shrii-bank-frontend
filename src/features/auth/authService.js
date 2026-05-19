import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

const login = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
};

const register = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.AUTH.REGISTER,
    data
  );

  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.AUTH.FORGOT_PASSWORD,
    data
  );

  return response.data;
};

const resetPassword = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.AUTH.RESET_PASSWORD,
    data
  );

  return response.data;
};

const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
};

export default authService;