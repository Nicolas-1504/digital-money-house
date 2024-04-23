export interface IAccount {
  alias: string;
  available_amount: number;
  cvu: string;
  id: number;
  user_id: number;
}

export interface ITransaction {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}
