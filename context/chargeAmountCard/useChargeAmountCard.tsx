import { IChargeAmountCardContext } from "DMH/utils/types/chargeAmountCardContext";
import { useContext } from "react";
import { ChargeAmountCardContext } from "./chargeAmountCardContext";

const useChargeAmountCard = (): IChargeAmountCardContext => {
  const context = useContext(ChargeAmountCardContext);
  if (!context) {
    throw new Error(
      "useChargeAmountCard must be used within a ChargeAmountCardProvider"
    );
  }
  return context;
};

export default useChargeAmountCard;
