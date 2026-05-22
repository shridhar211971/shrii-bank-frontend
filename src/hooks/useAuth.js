import { useSelector } from "react-redux";
import { getToken, getRoles } from "../utils/token";

const useAuth = () => {

  const { user, token, roles } = useSelector((state) => state.auth);

  const localStorageToken = getToken();
  const localStorageRoles = getRoles();

  const normalizedRoles = Array.isArray(roles)
    ? roles
    : roles
    ? [roles]
    : Array.isArray(localStorageRoles)
    ? localStorageRoles
    : localStorageRoles
    ? [localStorageRoles]
    : [];

  return {
    user,
    token,
    roles: normalizedRoles,
    isAuthenticated: !!token || !!localStorageToken,
  };
};

export default useAuth;