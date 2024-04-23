import { Grid, Modal, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import useMoneyFromAccount from "DMH/context/addMoneyFromAccount/useMoneyFromAccount";
import { getTransaction } from "DMH/services/account.service";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { HorizontalEndStack } from "DMH/shared/styled/containers";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { getAccountStorage } from "DMH/utils/account";
import { ITransaction } from "DMH/utils/types/account.types";
import moment from "moment";
import { useRouter } from "next/router";
import { CheckIcon } from "public/icons";
import React, { useState } from "react";
import { useEffect } from "react";

const AddMoneyFromAccountSuccess = () => {
  const [transaction, setTransaction] = useState<ITransaction>();
  const [pdf, setPdf] = useState("");
  const [open, setOpen] = useState(false);
  const { state } = useMoneyFromAccount();
  const account = getAccountStorage();
  const router = useRouter();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const generateTicket = () => {
    typeof window === "undefined" ? undefined : window.print();
  };

  useEffect(() => {
    getTransaction(account?.user_id, state?.transactionId).then((res) =>
      setTransaction(res)
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SectionWrapper bgcolor="primary.main" color="grey.800">
        <Stack alignItems={"center"} rowGap={"15px"}>
          <CheckIcon width={68} height={66} />
          <Typography variant="h2">
            Ya cargamos el dinero en tu cuenta
          </Typography>
        </Stack>
      </SectionWrapper>
      <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
        <Typography color="grey.300">
          {moment(transaction?.dated).locale("es").format("LLL")}
        </Typography>
        <Typography fontWeight={"bold"} variant={"h4"} color="primary">
          ${state?.amount}
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4}>
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography marginTop={"20px"} color={"#EEEAEA"} variant={"body1"}>
              Para
            </Typography>
            <Typography
              marginTop={"10px"}
              fontWeight={"bold"}
              variant={"h5"}
              color="primary"
            >
              Cuenta propia
            </Typography>
            <Typography marginTop={"20px"} color={"#EEEAEA"}>
              Digital Money House
            </Typography>
            <Typography marginTop={"5px"} color={"#EEEAEA"}>
              CVU {account?.cvu}
            </Typography>
          </Grid>
        </Grid>
      </SectionWrapper>
      <HorizontalEndStack
        gap={2}
        sx={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <PrimaryButton
          color="secondary"
          variant="contained"
          onClick={() => router.push("/home")}
          sx={{ maxWidth: "250px" }}
        >
          Ir al inicio
        </PrimaryButton>
        <PrimaryButton
          variant="contained"
          onClick={() => {
            generateTicket();
            handleOpen();
          }}
          sx={{ maxWidth: "250px" }}
        >
          Descargar comprobante
        </PrimaryButton>
      </HorizontalEndStack>
    </>
  );
};

export default AddMoneyFromAccountSuccess;
