import React from "react";
import { Grid } from "@mui/material";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import OriginForm from "./OriginForm";
import AmountForm from "./AmountForm";
import InfoCheckForm from "./InfoCheckForm";
import useMoneyFromAccount from "DMH/context/addMoneyFromAccount/useMoneyFromAccount";
import AddMoneyFromAccountSuccess from "./AddMoneyFromAccountSuccess";

const AddMoneyFromAccountStepperForm = () => {
  const { state } = useMoneyFromAccount();

  return (
    <MainBody>
      {state.activeStep === 0 && <OriginForm />}
      {state.activeStep === 1 && <AmountForm />}
      {state.activeStep === 2 && <InfoCheckForm />}
      {state.activeStep === 3 && <AddMoneyFromAccountSuccess />}
    </MainBody>
  );
};

export default AddMoneyFromAccountStepperForm;
