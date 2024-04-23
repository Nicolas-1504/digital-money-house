import { Dispatch } from "react";

export interface IChargeAmountCardState {
  activeStep: number;
  idNumber: number;
  amount: number;
  date: string;
  idTransaction: string;
  error: string;
}

export interface ISetStep {
  type: "SET_STEP";
  payload: number;
}

export interface ISetIdNumber {
  type: "SET_ID_NUMBER";
  payload: number;
}

export interface ISetAmount {
  type: "SET_AMOUNT";
  payload: number;
}

export interface ISetDate {
  type: "SET_DATE";
  payload: string;
}

export interface ISetIdTransaction {
  type: "SET_ID_TRANSACTION";
  payload: string;
}

export interface ISetError {
  type: "SET_ERROR";
  payload: string;
}

export type ChargeAmountCardActionType =
  | ISetStep
  | ISetIdNumber
  | ISetAmount
  | ISetDate
  | ISetIdTransaction
  | ISetError;

export interface IChargeAmountCardContext {
  state: IChargeAmountCardState;
  dispatch: Dispatch<ChargeAmountCardActionType>;
}
