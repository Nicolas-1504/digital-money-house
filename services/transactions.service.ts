import { getAccountStorage } from "DMH/utils/account";
import { getAuthStorage, removeAuthStorage } from "DMH/utils/auth";
import { IDepositData } from "DMH/utils/types/deposits.types";
import { ITransactionData } from "DMH/utils/types/transactions.types";

const API_URL = "https://digitalmoney.ctd.academy";

export const deposit = async (depositData: IDepositData) => {
  const { id: account_id } = getAccountStorage();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
    body: JSON.stringify(depositData),
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${account_id}/deposits`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};

export const transaction = async (transactionData: ITransactionData) => {
  const { id: account_id } = getAccountStorage();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
    body: JSON.stringify(transactionData),
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${account_id}/transactions`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
  } else if (response.status === 409) {
    return {
      error: "insufficient funds",
    };
  }
  return response.json();
};
