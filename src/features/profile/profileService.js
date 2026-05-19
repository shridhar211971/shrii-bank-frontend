import axiosInstance from "../../api/axois";
import ENDPOINTS from "../../api/endpoints";

const getProfile = async () => {

  const response = await axiosInstance.get(
    ENDPOINTS.PROFILE.ME
  );

  return response.data;
};

const profileService = {
  getProfile,
};

export default profileService;