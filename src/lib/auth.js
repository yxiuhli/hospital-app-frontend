import apiRequest from "@/config/apiRequest";

export const login = async (email, password) =>{
  const user = await apiRequest.post("/auth/login", {
    email,
    password,
  });
  return user;
}

export const resetPassword = (token, email, password, password2) =>{
  return apiRequest.post("auth/reset-password", {
    token,
    email,
    password,
    password2,
  });
}

export const register = (username, email, password) =>{
  return apiRequest.post("auth/register", {
    username,
    email,
    password,
  });
}
