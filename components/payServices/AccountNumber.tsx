import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import usePayServices from "DMH/context/payServices/usePayServices";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { payServicesSchema } from "DMH/utils/schemas/payServices";
import { TAccountNumber } from "DMH/utils/types/payServices";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const AccountNumber = () => {
  const router = useRouter()
  const form = useForm<TAccountNumber>({
    resolver: yupResolver(payServicesSchema),
  });
  const { handleSubmit, watch } = form;
  const { state, dispatch } = usePayServices();

  const onSubmit = (data: TAccountNumber) => {
    if(data.accountNumber % 2 === 0){
      dispatch({
        type: "SET_STEP",
        payload: state.activeStep + 1,
      });
      dispatch({
        type: "SET_ACCOUNT_NUMBER",
        payload: data.accountNumber,
      });
      return;
    }
    router.push('/pay-services/error-account')
  };

  const accountNumber = watch("accountNumber");

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      <Typography
        fontSize={20}
        fontWeight={"bold"}
        color={"#C1FD35"}
        marginBottom={"25px"}
      >
        Número de cuenta sin el primer 2
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Grid container>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <ControlledTextInput name="accountNumber" placeholder="01234567890" />
            </Grid>
            <Grid item xs={0} md={6} lg={6} xl={6}></Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Typography fontSize={"12px"} marginBottom={"10px"}>
                Son 11 números sin espacios, sin el “2” inicial. Agregá ceros
                adelante si tenés menos.
              </Typography>
            </Grid>
            <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
            <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <PrimaryButton
                style={
                  !accountNumber || accountNumber == 0
                    ? {
                        backgroundColor: "#CECECE",
                        color: "#000",
                      }
                    : {}
                }
                disabled={!accountNumber || accountNumber == 0}
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

export default AccountNumber;
