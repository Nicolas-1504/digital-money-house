import { IEmailForm } from "DMH/utils/types/login.types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "DMH/utils/schemas/loginSchemas";
import FormBox from "DMH/shared/form/FormBox";
import { Grid, Stack, Typography } from "@mui/material";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { FormError } from "DMH/shared/styled/FormError";
import { HorizontalEndStack } from "DMH/shared/styled/containers";
import { IOriginForm } from "DMH/utils/types/transferences.types";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { EditIcon } from "public/icons";
import useMoneyFromAccount from "DMH/context/addMoneyFromAccount/useMoneyFromAccount";
import { getAccountStorage } from "DMH/utils/account";
import Spinner from "DMH/shared/items/Spinner";
import { deposit } from "DMH/services/transactions.service";
import { IErrorType } from "DMH/utils/types/deposits.types";

const InfoCheckForm = () => {
  const { state, dispatch } = useMoneyFromAccount();
  const account = getAccountStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorType>({
    error: false,
    errorMessage: "",
  });

  const data = {
    amount: state?.amount,
    origin: state?.origin,
    destination: account?.cvu,
  };

  const onSubmit = () => {
    setLoading(true);
    deposit(data)
      .then((res) => {
        console.log(res);
        if (res?.error) {
          setError({ error: true, errorMessage: res.message });
        } else {
          if (res?.id) {
            dispatch({
              type: "SET_STEP",
              payload: state.activeStep + 1,
            });
            dispatch({ type: "SET_ID_TRANSACTION", payload: res?.id });
          }
          setError({ error: false, errorMessage: "" });
          dispatch({
            type: "SET_STEP",
            payload: state.activeStep + 1,
          });
        }
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
        Revisá que esté todo bien
      </Typography>
      <Stack spacing={2}>
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
        <Stack>
          <Typography fontWeight={"bold"} variant={"h5"}>
            {state?.amount}
          </Typography>
          <Typography marginTop={"20px"} color={"#EEEAEA"} variant={"body1"}>
            Desde
          </Typography>
          <Typography
            marginTop={"10px"}
            fontWeight={"bold"}
            variant={"h5"}
            color="primary"
          >
            Cuenta externa
          </Typography>
          <Typography marginTop={"20px"} color={"#EEEAEA"}>
            Digital Money House
          </Typography>
          <Typography marginTop={"5px"} color={"#EEEAEA"}>
            CVU {state?.origin}
          </Typography>
        </Stack>
        <Stack>
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
        </Stack>
      </Stack>
      <HorizontalEndStack>
        <PrimaryButton
          color="primary"
          variant="contained"
          onClick={onSubmit}
          sx={{ maxWidth: "250px", mt: "3rem" }}
        >
          {loading ? <Spinner /> : "Continuar"}
        </PrimaryButton>
        <FormError>{state.error}</FormError>
      </HorizontalEndStack>
    </SectionWrapper>
  );
};

export default InfoCheckForm;
