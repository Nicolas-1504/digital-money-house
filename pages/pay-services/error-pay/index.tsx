import React from "react";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { FailIcon } from "public/icons";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { useRouter } from "next/router";

const ErrorPayServices = () => {
  const router = useRouter();

  return (
    <MainBody>
      <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
        <Stack alignItems={"center"}>
          <FailIcon width={68} height={66} />
          <Typography textAlign={"center"} variant="h2" marginTop={"15px"}>
            Hubo un problema con tu pago
          </Typography>
          <Box
            sx={{
              height: "1px",
              backgroundColor: "#3A393E",
              width: "90%",
              margin: "15px 0px",
            }}
          ></Box>
          <Typography
            width={"300px"}
            textAlign={"center"}
            variant="body1"
            color={"#CECECE"}
          >
            Puede deberse a fondos insuficientes, comunicate con la entidad
            emisora de la tarjeta
          </Typography>
        </Stack>
      </SectionWrapper>
      <Grid container>
        <Grid item xs={0} md={8} lg={8} xl={8}></Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <PrimaryButton
            variant="contained"
            onClick={() => {
              router.push("/pay-services");
            }}
          >
            Volver a intentarlo
          </PrimaryButton>
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default ErrorPayServices;
