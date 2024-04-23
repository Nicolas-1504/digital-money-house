import { ITransferenceContext } from "DMH/utils/types/transferenceContext.types";
import { useContext } from "react";
import { TransferenceContext } from "./AddMoneyFromAccountContext";

const useMoneyFromAccount = (): ITransferenceContext => {
  const context = useContext(TransferenceContext);
  if (!context) {
    throw new Error(
      "useTransference must be used within a TransferenceProvider"
    );
  }
  return context;
};

export default useMoneyFromAccount;
