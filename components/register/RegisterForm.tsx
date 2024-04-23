import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { registerUser } from "DMH/services/users.service";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import FormBox from "DMH/shared/form/FormBox";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { registerSchema } from "DMH/utils/schemas/registerSchema";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormError } from "DMH/shared/styled/FormError";
import Spinner from "DMH/shared/items/Spinner";
import { IRegisterForm } from "DMH/utils/types/register.types";
import { BodyCenter } from "DMH/shared/styled/BodyCenter";

const RegisterForm = () => {
  const form = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = (data: IRegisterForm) => {
    setError("");
    setLoading(true);
    registerUser(data)
      .then((res) => {
        res?.account_id
          ? router.push("/register/success")
          : setError(res?.error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    Object.values(errors).find((err) =>
      err?.type === "required"
        ? setError("Completa los campos requeridos")
        : setError("")
    );
  }, [errors]);

  return (
    <BodyCenter>
      <FormBox title="Crear cuenta">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <Grid container columnSpacing={3}>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput name="firstName" placeholder="Nombre*" />
              </Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput name="lastName" placeholder="Apellido*" />
              </Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput name="dni" placeholder="DNI*" />
              </Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput
                  name="email"
                  placeholder="Correo electrónico*"
                />
              </Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={12} md={10} lg={6} xl={6}>
                <Typography
                  sx={{
                    color: "#EEEAEA",
                    fontSize: "12px",
                    margin: "14px 0",
                    textAlign: "center",
                  }}
                >
                  Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
                  carácter especial, una mayúscula y un número)
                </Typography>
              </Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput
                  name="password"
                  placeholder="Contraseña*"
                  passwordAdornment
                />
              </Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña*"
                  passwordAdornment
                />
              </Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <ControlledTextInput name="phone" placeholder="Teléfono*" />
              </Grid>
              <Grid item xs={12} md={5} lg={3} xl={3}>
                <PrimaryButton
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                >
                  Crear cuenta
                </PrimaryButton>
              </Grid>
              <Grid item xs={0} md={1} lg={3} xl={3}></Grid>
            </Grid>
            {loading && <Spinner />}
            {error && <FormError>{error}</FormError>}
          </FormProvider>
        </form>
      </FormBox>
    </BodyCenter>
  );
};

export default RegisterForm;
