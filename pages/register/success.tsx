import { Grid, Stack, Typography } from "@mui/material";
import { BodyCenter } from "DMH/shared/styled/BodyCenter";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SuccessTitle } from "DMH/shared/styled/SuccessTitle";
import { SuccessIconBox } from "DMH/shared/styled/SuccessIconBox";
import MetadataHead from "DMH/shared/items/MetadataHead";

const RegisterSuccess: NextPage = () => {
  return (
    <>
      <MetadataHead title="DMH | Registro exitoso" content="Registro exitoso" />
      <BodyCenter>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={10} md={8} lg={6} xl={4}>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"20px"}
              width={"100%"}
            >
              <SuccessTitle>Registro Exitoso</SuccessTitle>
              <SuccessIconBox>
                <CheckCircleOutlineIcon
                  sx={{
                    color: "primary.main",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </SuccessIconBox>
              <PrimaryButton variant="contained" href="/login">
                Continuar
              </PrimaryButton>
            </Stack>
          </Grid>
        </Grid>
      </BodyCenter>
    </>
  );
};

export default RegisterSuccess;
