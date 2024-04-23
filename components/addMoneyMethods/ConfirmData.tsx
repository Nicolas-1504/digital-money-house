import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import useChargeAmountCard from "DMH/context/chargeAmountCard/useChargeAmountCard";
import { deposit } from "DMH/services/transactions.service";
import Spinner from "DMH/shared/items/Spinner";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { FormError } from "DMH/shared/styled/FormError";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { getAccountStorage } from "DMH/utils/account";
import { EditIcon } from "public/icons";
import React, { useState } from "react";

const ConfirmData = () => {
  const account = getAccountStorage();
  const { state, dispatch } = useChargeAmountCard();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const months: Record<number, string> = {
    1: "enero",
    2: "febrero",
    3: "marzo",
    4: "abril",
    5: "mayo",
    6: "junio",
    7: "julio",
    8: "agosto",
    9: "septiembre",
    10: "octubre",
    11: "noviembre",
    12: "diciembre",
  };

  const data = {
    amount: state?.amount,
    origin: `Terminado en ${String(state?.idNumber)}`,
    destination: account?.cvu,
  };

  const onSubmit = () => {
    setLoading(true);
    const date = new Date();
    dispatch({
      type: "SET_DATE",
      payload: `${date.getDate()} de ${
        months[date.getMonth() + 1]
      } ${date.getFullYear()} a ${date.getHours()}:${
        date.getMinutes() < 10 ? "0" : ""
      }${date.getMinutes()} hs.`,
    });
    deposit(data)
      .then((res) => {
        if (res?.id) {
          dispatch({ type: "SET_STEP", payload: state?.activeStep + 1 });
          dispatch({ type: "SET_ID_TRANSACTION", payload: res?.id });
        }
        setError(res?.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      <Typography
        fontSize={20}
        fontWeight={"bold"}
        color={"#C1FD35"}
        marginBottom={"25px"}
      >
        Revisá que está todo bien
      </Typography>
      <Stack flexDirection={"row"} alignItems={"center"} columnGap={"10px"}>
        <Typography color={"#EEEAEA"}>Vas a transferir</Typography>
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({ type: "SET_STEP", payload: state?.activeStep - 2 })
          }
        >
          <EditIcon height={30} width={30} />
        </div>
      </Stack>
      <Typography fontWeight={"bold"} variant={"h5"}>
        {state?.amount}
      </Typography>
      <Typography marginTop={"20px"} color={"#EEEAEA"} variant={"body1"}>
        Para
      </Typography>
      <Typography marginTop={"10px"} fontWeight={"bold"} variant={"h5"}>
        Cuenta propia
      </Typography>
      <Typography marginTop={"20px"} color={"#EEEAEA"}>
        Digital Money House
      </Typography>
      <Typography marginTop={"5px"} color={"#EEEAEA"}>
        CVU {account?.cvu}
      </Typography>
      <Grid container>
        <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <PrimaryButton
            variant="contained"
            fullWidth
            onClick={() => onSubmit()}
          >
            {loading ? <Spinner /> : "Continuar"}
          </PrimaryButton>
        </Grid>
        <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
        <Grid item xs={12} md={4} lg={4} xl={4} marginTop={2}>
          {error && <FormError>{error}</FormError>}
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default ConfirmData;
