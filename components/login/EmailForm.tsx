import useLogin from "DMH/context/login/useLogin";
import { IEmailForm } from "DMH/utils/types/login.types";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "DMH/utils/schemas/loginSchemas";
import FormBox from "DMH/shared/form/FormBox";
import { Stack } from "@mui/material";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { FormError } from "DMH/shared/styled/FormError";

const EmailForm = () => {
  const { state, dispatch } = useLogin();

  const methods = useForm<IEmailForm>({
    mode: "all",
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: state.email || "",
    },
  });

  useEffect(
    () => {
      methods.setFocus("email");
    },
    // eslint-disable-next-line
    []
  );

  const onSubmit = (data: IEmailForm) => {
    dispatch({
      type: "SET_STEP",
      payload: state.activeStep + 1,
    });
    dispatch({
      type: "SET_EMAIL",
      payload: data.email,
    });
  };

  return (
    <FormBox title="¡Hola! Ingresá tu e-mail">
      <form style={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput
            name={"email"}
            placeholder={"Correo electrónico"}
          />
        </FormProvider>
        <Stack direction={"column"} spacing={2}>
          <PrimaryButton
            variant="contained"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Continuar
          </PrimaryButton>
          <PrimaryButton color="secondary" variant="contained" href="/register">
            Crear cuenta
          </PrimaryButton>
          <FormError>{state.error}</FormError>
        </Stack>
      </form>
    </FormBox>
  );
};

export default EmailForm;
