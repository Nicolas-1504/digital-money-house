export interface IDepositData {
  origin?: string;
  destination?: string;
  dated?: string;
  amount: number;
}

export interface IErrorType {
  error: boolean;
  errorMessage: string;
}
