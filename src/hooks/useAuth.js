import { useSelector } from "react-redux";
import { getToken } from "../utils/token";

const useAuth = () => {

  const { user, token } = useSelector(
    (state) => state.auth
  );

  // Check both Redux state and localStorage for token
  const localStorageToken = getToken();

  return {
    user,
    token,
    isAuthenticated: !!token || !!localStorageToken,
  };
};

export default useAuth;