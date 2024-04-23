import { Grid, Modal, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import useChargeAmountCard from "DMH/context/chargeAmountCard/useChargeAmountCard";
import { getTransaction } from "DMH/services/account.service";
import Spinner from "DMH/shared/items/Spinner";
import {
  ButtonActivityDetail,
  ButtonsContainer,
} from "DMH/shared/styled/ActvityDetail";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { ModalBox } from "DMH/shared/styled/Cards";
import { HorizontalEndStack } from "DMH/shared/styled/containers";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { getAccountStorage } from "DMH/utils/account";
import { ITransaction } from "DMH/utils/types/account.types";
import { useRouter } from "next/router";
import { CheckIcon } from "public/icons";
import React, { useState } from "react";
import { useEffect } from "react";

const ChargeSuccess = () => {
  const [transaction, setTransaction] = useState<ITransaction>();
  const [pdf, setPdf] = useState("");
  const [open, setOpen] = useState(false);
  const { state } = useChargeAmountCard();
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
    getTransaction(account?.user_id, state?.idTransaction).then((res) =>
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
        <Typography color={"#EEEAEA"}>{state?.date}</Typography>
        <Typography color={"#C1FD35"} fontWeight={"bold"} variant={"h5"}>
          ${state?.amount}
        </Typography>
        <Typography marginTop={"30px"} color={"#EEEAEA"} variant={"body1"}>
          Para
        </Typography>
        <Typography
          color={"#C1FD35"}
          marginTop={"15px"}
          fontWeight={"bold"}
          variant={"h5"}
        >
          Cuenta propia
        </Typography>
        <Typography marginTop={"20px"} color={"#EEEAEA"}>
          Digital Money House
        </Typography>
        <Typography marginTop={"5px"} color={"#EEEAEA"}>
          CVU {account?.cvu}
        </Typography>
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

export default ChargeSuccess;
