import {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from "react";
import {
  ChargeAmountCardActionType,
  IChargeAmountCardContext,
  IChargeAmountCardState,
} from "DMH/utils/types/chargeAmountCardContext";

export const ChargeAmountCardContext = createContext<
  IChargeAmountCardContext | undefined
>(undefined);

const reducer = (
  state: IChargeAmountCardState,
  action: ChargeAmountCardActionType
) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    case "SET_ID_NUMBER":
      return {
        ...state,
        idNumber: action.payload,
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_ID_TRANSACTION":
      return {
        ...state,
        idTransaction: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
  }
};

const initialState: IChargeAmountCardState = {
  activeStep: 0,
  idNumber: 0,
  amount: 0,
  date: "",
  idTransaction: "",
  error: "",
};

export const ChargeAmountCardProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <ChargeAmountCardContext.Provider value={value}>
      {children}
    </ChargeAmountCardContext.Provider>
  );
};
