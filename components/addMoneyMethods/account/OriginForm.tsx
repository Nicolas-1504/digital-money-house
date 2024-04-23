import { IEmailForm } from "DMH/utils/types/login.types";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "DMH/utils/schemas/loginSchemas";
import FormBox from "DMH/shared/form/FormBox";
import { Box, Stack, Typography } from "@mui/material";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { FormError } from "DMH/shared/styled/FormError";
import { HorizontalEndStack } from "DMH/shared/styled/containers";
import { IOriginForm } from "DMH/utils/types/transferences.types";
import { originSchema } from "DMH/utils/schemas/transferenceSchemas";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { maxWidth } from "@mui/system";
import useMoneyFromAccount from "DMH/context/addMoneyFromAccount/useMoneyFromAccount";

const OriginForm = () => {
  const { state, dispatch } = useMoneyFromAccount();

  const methods = useForm<IOriginForm>({
    mode: "all",
    resolver: yupResolver(originSchema),
    defaultValues: {
      origin: state.origin || "",
    },
  });

  useEffect(
    () => {
      methods.setFocus("origin");
    },
    // eslint-disable-next-line
    []
  );

  const onSubmit = (data: IOriginForm) => {
    dispatch({
      type: "SET_STEP",
      payload: state.activeStep + 1,
    });
    dispatch({
      type: "SET_ORIGIN",
      payload: data.origin,
    });
  };

  return (
    <SectionWrapper>
      <Typography color="primary" variant="h5" sx={{ mb: 2 }}>
        Ingresá el CVU de la cuenta externa
      </Typography>
      <form style={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box sx={{ maxWidth: "350px" }}>
            <ControlledTextInput
              placeholder={"0000003100036123456789"}
              name={"origin"}
            />
          </Box>
        </FormProvider>
        <HorizontalEndStack>
          <PrimaryButton
            color="primary"
            variant="contained"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={!methods.formState.isValid}
            sx={{ maxWidth: "250px" }}
          >
            Continuar
          </PrimaryButton>
          <FormError>{state.error}</FormError>
        </HorizontalEndStack>
      </form>
    </SectionWrapper>
  );
};

export default OriginForm;
