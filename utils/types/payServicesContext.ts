import { Dispatch } from "react";

export interface IPayServicesState {
  activeStep: number;
  service: string;
  accountNumber: number;
  cardNumber: number;
  date: string;
  amount: number;
  error: string;
  search: string;
}

export interface ISetStep {
  type: "SET_STEP";
  payload: number;
}

export interface ISetService {
  type: "SET_SERVICE";
  payload: string;
}

export interface ISetAccountNumber {
  type: "SET_ACCOUNT_NUMBER";
  payload: number;
}

export interface ISetCardNumber {
  type: "SET_CARD_NUMBER";
  payload: number;
}

export interface ISetDate {
  type: "SET_DATE";
  payload: string;
}

export interface ISetAmount {
  type: "SET_AMOUNT";
  payload: number;
}

export interface ISetError {
  type: "SET_ERROR";
  payload: string;
}

export interface ISetSearch {
  type: "SET_SEARCH";
  payload: string;
}
export interface ISetDefault {
  type: "SET_DEFAULT";
}

export type PayServicesActionType =
  | ISetStep
  | ISetService
  | ISetAccountNumber
  | ISetCardNumber
  | ISetDate
  | ISetAmount
  | ISetError
  | ISetSearch
  | ISetDefault;

export interface IPayServicesContext {
  state: IPayServicesState;
  dispatch: Dispatch<PayServicesActionType>;
}
