export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setRoles = (roles) => {
  localStorage.setItem("roles", JSON.stringify(roles));
};

export const getRoles = () => {
  return JSON.parse(localStorage.getItem("roles")) || [];
};

export const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
};