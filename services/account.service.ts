import { getAuthStorage, removeAuthStorage } from "DMH/utils/auth";

const API_URL = "https://digitalmoney.ctd.academy";

export const getAccount = async () => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
  };
  const response = await fetch(`${API_URL}/api/account`, config);
  if (response.status === 401) {
    removeAuthStorage();
    return false;
  }
  return response.json();
};

export const getTransactions = async (accountId: number) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${accountId}/activity`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
    return false;
  }
  return response.json();
};

export const getTransaction = async (
  accountId: number,
  transactionId: string
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${accountId}/transactions/${transactionId}`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
    return false;
  }
  return response.json();
};
