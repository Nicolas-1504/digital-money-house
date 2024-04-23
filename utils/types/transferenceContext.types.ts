import { Dispatch } from "react";

export interface ITransferenceState {
  activeStep: number;
  origin: string;
  amount: number;
  error: string;
  transactionId: string;
}

export interface ISetStep {
  type: "SET_STEP";
  payload: number;
}

export interface ISetOrigin {
  type: "SET_ORIGIN";
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

export interface ISetTransactionId {
  type: "SET_ID_TRANSACTION";
  payload: string;
}

export type TransferenceActionType =
  | ISetStep
  | ISetOrigin
  | ISetAmount
  | ISetError
  | ISetTransactionId;

export interface ITransferenceContext {
  state: ITransferenceState;
  dispatch: Dispatch<TransferenceActionType>;
}
