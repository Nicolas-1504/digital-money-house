import { createContext, useEffect, useState } from "react";
import { FC, PropsWithChildren } from "react";
import {
  setAccountStorage,
  getAccountStorage,
  removeAccountStorage,
} from "DMH/utils/account";
import { IAccount } from "DMH/utils/types/account.types";

interface IAccountData {
  account: {
    alias: string;
    available_amount: number;
    cvu: string;
    id: number;
    user_id: number;
  } | null;
  cardsAmount: number | null;
  setAccount: (account: IAccount) => void;
  setCardsAmount: (cardsAmount: number | null) => void;
  removeAccount: () => void;
}

export const AccountContext = createContext<IAccountData>({
  account: {
    alias: "",
    available_amount: 0,
    cvu: "",
    id: 0,
    user_id: 0,
  },
  cardsAmount: null,
  setAccount: (account: IAccount) => {},
  setCardsAmount: (cardsAmount: number | null) => {},
  removeAccount: () => {},
});

const { Provider } = AccountContext;

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAcc] = useState<IAccount | null>(null);
  const [cardsAmount, setCardsAmount] = useState<number | null>(null);

  useEffect(() => {
    const storedAccount = getAccountStorage();
    if (storedAccount) {
      setAcc(storedAccount);
    } else {
      setAcc(null);
    }
  }, [setAcc]);

  const setAccount = (data: IAccount) => {
    setAcc(data);
    setAccountStorage(data);
  };

  const removeAccount = () => {
    removeAccountStorage();
    setAcc(null);
  };

  return (
    <Provider
      value={{
        account,
        setAccount,
        removeAccount,
        cardsAmount,
        setCardsAmount,
      }}
    >
      {children}
    </Provider>
  );
};
