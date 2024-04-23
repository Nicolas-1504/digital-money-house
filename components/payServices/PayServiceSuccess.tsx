import { Stack, Typography, useTheme } from "@mui/material";
import usePayServices from "DMH/context/payServices/usePayServices";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { HorizontalEndStack } from "DMH/shared/styled/containers";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { useRouter } from "next/router";
import { CheckIcon } from "public/icons";
import React from "react";

const PayServiceSuccess = () => {
  const { state } = usePayServices();
  const theme = useTheme();
  const router = useRouter();

  const generateTicket = () => {
    typeof window === "undefined" ? undefined : window.print();
  };

  return (
    <>
      <SectionWrapper bgcolor="primary.main" color="grey.800">
        <Stack alignItems={"center"} rowGap={"15px"}>
          <CheckIcon width={68} height={66} />
          <Typography variant="h2">Ya realizaste tu pago</Typography>
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
          {state?.service}
        </Typography>
        <Typography marginTop={"20px"} color={"#EEEAEA"}>
          Tarjeta
        </Typography>
        <Typography marginTop={"5px"} color={"#EEEAEA"}>
          Terminada en {state?.cardNumber}
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
          }}
          sx={{ maxWidth: "250px" }}
        >
          Descargar comprobante
        </PrimaryButton>
      </HorizontalEndStack>
    </>
  );
};

export default PayServiceSuccess;
