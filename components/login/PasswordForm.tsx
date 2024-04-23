import useLogin from "DMH/context/login/useLogin";
import React, { useEffect, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IPasswordForm } from "DMH/utils/types/login.types";
import { Stack } from "@mui/material";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import FormBox from "DMH/shared/form/FormBox";
import { useRouter } from "next/router";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import Spinner from "DMH/shared/items/Spinner";
import { useState } from "react";
import { doLogin } from "DMH/actions/auth/doLogin";
import { FormError } from "DMH/shared/styled/FormError";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "DMH/utils/schemas/loginSchemas";
import { AuthContext } from "DMH/context/auth/AuthContext";

const PasswordForm = () => {
  const router = useRouter();
  const { state, dispatch } = useLogin();
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticate } = useContext(AuthContext);

  const methods = useForm<IPasswordForm>({
    mode: "all",
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(
    () => {
      methods.setFocus("password");
    },
    // eslint-disable-next-line
    []
  );

  const onSubmit = async (data: IPasswordForm) => {
    setLoading(true);

    const fullData = {
      email: state.email,
      password: data.password,
    };

    await doLogin(fullData, router, dispatch, state, authenticate);

    setLoading(false);
  };

  return (
    <FormBox title="Ingresá tu contraseña">
      <form style={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput
            name={"password"}
            placeholder={"Contraseña"}
            passwordAdornment
          />
        </FormProvider>
        <Stack direction={"column"} spacing={2}>
          <PrimaryButton
            variant="contained"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Continuar
          </PrimaryButton>
          <FormError>{state.error}</FormError>
          {loading && <Spinner />}
        </Stack>
      </form>
    </FormBox>
  );
};

export default PasswordForm;
