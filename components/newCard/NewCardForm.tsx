import React, { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Unstable_Grid2";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import {
  TNewCardSchema,
  NewCardSchema,
  TNewCardSubmit,
} from "DMH/utils/schemas/newCardSchemas";
import ControlledCardInput from "DMH/shared/form/ControlledCardInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { useRouter } from "next/router";
import { FormError } from "DMH/shared/styled/FormError";
import Spinner from "DMH/shared/items/Spinner";
import { postCards } from "DMH/services/card.service";
import ContainerCardForm from "DMH/components/newCard/ContainerCardForm";

const NewCardForm: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<TNewCardSchema>({
    mode: "onChange",
    resolver: yupResolver(NewCardSchema),
    defaultValues: {
      number: "",
      cvc: "",
      expiry: "",
      name: "",
      focus: "number",
    },
  });
  const { setFocus, handleSubmit, watch, formState, setValue } = methods;
  const name = watch("name");
  const expiry = watch("expiry");
  const number = watch("number");
  const cvc = watch("cvc");
  const focus = watch("focus");

  const handleFocus = (e: any) => {
    setValue("focus", e.target.name);
  };

  const formatData = (formData: TNewCardSchema) => {
    const { name, number, expiry, cvc } = formData;
    const submitData: TNewCardSubmit = {
      cod: cvc,
      expiration_date: expiry,
      first_last_name: name,
      number_id: number,
    };
    return submitData;
  };

  const onSubmit: any = (data: TNewCardSchema) => {
    setError("");
    setLoading(true);
    postCards(formatData(data))
      .then((res) => {
        res?.account_id ? router.push("/cards") : setError(res?.error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setFocus("number");
  }, [setFocus]);

  return (
    <ContainerCardForm bgcolor="primary.contrastText">
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Cards
              number={number}
              cvc={cvc}
              expiry={expiry}
              name={name}
              focused={focus}
            />
          </Grid>
          <Grid xs={12}>
            <form>
              <Grid container>
                <Grid xs={12} lg={6}>
                  <ControlledCardInput
                    name="number"
                    placeholder="Número de la tarjeta*"
                    onFocus={handleFocus}
                  />
                </Grid>
                <Grid xs={12} lg={6}>
                  <ControlledCardInput
                    name="name"
                    placeholder="Nombre y apellido*"
                    onFocus={handleFocus}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <ControlledCardInput
                    name="expiry"
                    placeholder="Fecha de vencimiento*"
                    onFocus={handleFocus}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <ControlledCardInput
                    name="cvc"
                    placeholder="Código de seguridad*"
                    onFocus={handleFocus}
                    passwordAdornment
                  />
                </Grid>
                <Grid container xs={12} sx={{ justifyContent: "flex-end" }}>
                  <Grid xs={12} lg={6}>
                    <PrimaryButton
                      variant="contained"
                      disabled={!formState.isValid}
                      fullWidth
                      onClick={handleSubmit(onSubmit)}
                    >
                      {loading ? <Spinner /> : "Continuar"}
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </FormProvider>
      {error && <FormError mt={3}>{error}</FormError>}
    </ContainerCardForm>
  );
};

export default NewCardForm;
