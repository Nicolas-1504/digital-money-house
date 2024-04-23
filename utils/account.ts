import { IAccount } from "DMH/utils/types/account.types";

export const setAccountStorage = (account: IAccount) => {
  localStorage.setItem("account", JSON.stringify(account));
};

export const getAccountStorage = () => {
  return JSON.parse(localStorage.getItem("account") as string);
};

export const removeAccountStorage = () => {
  localStorage.removeItem("account");
};
