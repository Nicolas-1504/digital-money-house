import useChargeAmountCard from "DMH/context/chargeAmountCard/useChargeAmountCard";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import React from "react";
import ChargeSuccess from "../ChargeSuccess";
import ConfirmData from "../ConfirmData";
import DepositeAmount from "./DepositAmount";
import SelectCard from "./SelectCard";

const ChargeAmount = () => {
  const { state } = useChargeAmountCard();

  return (
    <MainBody>
      {state.activeStep === 0 && <SelectCard />}
      {state.activeStep === 1 && <DepositeAmount />}
      {state.activeStep === 2 && <ConfirmData />}
      {state.activeStep === 3 && <ChargeSuccess />}
    </MainBody>
  );
};

export default ChargeAmount;
