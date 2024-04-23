import { getAuthStorage, removeAuthStorage } from "DMH/utils/auth";
import { getAccountStorage } from "DMH/utils/account";
import { TNewCardSubmit } from "DMH/utils/schemas/newCardSchemas";

const API_URL = "https://digitalmoney.ctd.academy";

export const getCards = async () => {
  const { id: account_id } = getAccountStorage();
  const token = getAuthStorage();

  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${account_id}/cards`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};

export const postCards = async (cardData: TNewCardSubmit) => {
  const { id: account_id } = getAccountStorage();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
    body: JSON.stringify(cardData),
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${account_id}/cards`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};

export const deleteCard = async (card_id: number) => {
  const { id: account_id } = getAccountStorage();
  const token = getAuthStorage();

  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await fetch(
    `${API_URL}/api/accounts/${account_id}/cards/${card_id}`,
    config
  );
  if (response.status === 401) {
    removeAuthStorage();
  }
  return response.json();
};
