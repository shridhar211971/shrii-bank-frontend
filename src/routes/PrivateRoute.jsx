import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasAccess =
    !Array.isArray(allowedRoles) ||
    allowedRoles.length === 0 ||
    roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;