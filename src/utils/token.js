export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// ROLES

export const setRoles = (roles) => {
  localStorage.setItem(
    "roles",
    JSON.stringify(roles)
  );
};

export const getRoles = () => {
  return (
    JSON.parse(
      localStorage.getItem("roles")
    ) || []
  );
};

// USER INFO

export const setUserInfo = (user) => {

  localStorage.setItem(
    "firstName",
    user?.firstName || ""
  );

  localStorage.setItem(
    "lastName",
    user?.lastName || ""
  );

  localStorage.setItem(
    "email",
    user?.email || ""
  );
};

export const getUserInfo = () => {

  return {
    firstName:
      localStorage.getItem("firstName") || "",

    lastName:
      localStorage.getItem("lastName") || "",

    email:
      localStorage.getItem("email") || "",
  };
};

// CLEAR STORAGE

export const clearStorage = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("roles");

  localStorage.removeItem("firstName");

  localStorage.removeItem("lastName");

  localStorage.removeItem("email");
};