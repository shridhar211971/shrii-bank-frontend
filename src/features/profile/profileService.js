import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

const getProfile = async () => {

  const response = await axiosInstance.get(
    ENDPOINTS.USERS.PROFILE
  );

  return response.data;
};

const updatePassword = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.USERS.UPDATE_PASSWORD,
    data
  );

  return response.data;
};

const profileService = {
  getProfile,
  updatePassword,
};

export default profileService;