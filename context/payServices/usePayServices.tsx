import { IPayServicesContext } from "DMH/utils/types/payServicesContext";
import { useContext } from "react";
import { PayServicesContext } from "./PayServicesContext";

const usePayServices = (): IPayServicesContext => {
  const context = useContext(PayServicesContext);
  if (!context) {
    throw new Error("usePayServices must be used within a PayServicesProvider");
  }
  return context;
};

export default usePayServices;
