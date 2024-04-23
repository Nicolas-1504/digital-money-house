import usePayServices from "DMH/context/payServices/usePayServices";
import React from "react";
import AccountNumber from "./AccountNumber";
import PayServiceSuccess from "./PayServiceSuccess";
import SelectCardService from "./SelectCardService";
import SelectService from "./SelectService";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";

const PayServicesForm = () => {
  const { state } = usePayServices();

  return (
    <>
      <SectionIndexMobile section={"Pagar servicios"} />
      {state.activeStep === 0 && <SelectService />}
      {state.activeStep === 1 && <AccountNumber />}
      {state.activeStep === 2 && <SelectCardService />}
      {state.activeStep === 3 && <PayServiceSuccess />}
    </>
  );
};

export default PayServicesForm;
