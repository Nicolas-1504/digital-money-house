import { getAuthStorage, removeAuthStorage } from "DMH/utils/auth";
import { ILoginForm } from "DMH/utils/types/login.types";
import { IRegisterForm } from "DMH/utils/types/register.types";
import { IUserData } from "DMH/utils/types/user.types";

const API_URL = "https://digitalmoney.ctd.academy";

export const getUser = async (id: number) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
  };
  if (id !== undefined) {
    const response = await fetch(`${API_URL}/api/users/${id}`, config);
    if (response.status === 401) {
      removeAuthStorage();
    }
    return response.json();
  }
  removeAuthStorage();
};

export const registerUser = async (registerData: IRegisterForm) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  };
  const response = await fetch(`${API_URL}/api/users`, config);
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};

export const loginUser = async (loginData: ILoginForm) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };
  const response = await fetch(`${API_URL}/api/login`, config);
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};

export const updateUser = async (updateUserData: IUserData, id: number) => {
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
    body: JSON.stringify(updateUserData),
  };
  const response = await fetch(`${API_URL}/api/users/${id}`, config);
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};
