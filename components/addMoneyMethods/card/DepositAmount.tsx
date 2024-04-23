import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import useChargeAmountCard from "DMH/context/chargeAmountCard/useChargeAmountCard";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { amountSchema } from "DMH/utils/schemas/amount";
import { IAmountForm } from "DMH/utils/types/amount.types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const DepositeAmount = () => {
  const form = useForm<IAmountForm>({
    mode: "all",
    resolver: yupResolver(amountSchema),
  });
  const { handleSubmit, watch } = form;
  const { state, dispatch } = useChargeAmountCard();

  const onSubmit = (data: IAmountForm) => {
    dispatch({
      type: "SET_STEP",
      payload: state.activeStep + 1,
    });
    dispatch({
      type: "SET_AMOUNT",
      payload: data.amount,
    });
  };

  const amount = watch("amount");

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      <Typography
        fontSize={20}
        fontWeight={"bold"}
        color={"#C1FD35"}
        marginBottom={"25px"}
      >
        ¿Cuánto querés ingresar a la cuenta?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Grid container>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <ControlledTextInput name="amount" placeholder="$0" />
            </Grid>
            <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
            <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <PrimaryButton
                style={
                  !amount || amount == 0
                    ? {
                        backgroundColor: "#CECECE",
                        color: "#000",
                      }
                    : {}
                }
                disabled={!amount || amount == 0}
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                Continuar
              </PrimaryButton>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </SectionWrapper>
  );
};

export default DepositeAmount;
