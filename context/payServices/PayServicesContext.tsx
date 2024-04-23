import {
  IPayServicesContext,
  IPayServicesState,
  PayServicesActionType,
} from "DMH/utils/types/payServicesContext";
import {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from "react";

export const PayServicesContext = createContext<
  IPayServicesContext | undefined
>(undefined);

const reducer = (state: IPayServicesState, action: PayServicesActionType) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
      };
    case "SET_ACCOUNT_NUMBER":
      return {
        ...state,
        accountNumber: action.payload,
      };
    case "SET_CARD_NUMBER":
      return {
        ...state,
        cardNumber: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "SET_DEFAULT":
      return {
        ...initialState,
      };
  }
};

const initialState: IPayServicesState = {
  activeStep: 0,
  service: "",
  accountNumber: 0,
  cardNumber: 0,
  date: "",
  amount: 0,
  error: "",
  search: "",
};

export const PayServicesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <PayServicesContext.Provider value={value}>
      {children}
    </PayServicesContext.Provider>
  );
};
