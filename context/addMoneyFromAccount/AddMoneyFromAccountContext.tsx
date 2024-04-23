import {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from "react";
import {
  ITransferenceContext,
  ITransferenceState,
  TransferenceActionType,
} from "DMH/utils/types/transferenceContext.types";

export const TransferenceContext = createContext<
  ITransferenceContext | undefined
>(undefined);

const reducer = (state: ITransferenceState, action: TransferenceActionType) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    case "SET_ORIGIN":
      return {
        ...state,
        origin: action.payload,
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
    case "SET_ID_TRANSACTION":
      return {
        ...state,
        transactionId: action.payload,
      };
  }
};

const initialState: ITransferenceState = {
  activeStep: 0,
  origin: "",
  amount: 0,
  error: "",
  transactionId: "",
};

export const TransferenceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <TransferenceContext.Provider value={value}>
      {children}
    </TransferenceContext.Provider>
  );
};
