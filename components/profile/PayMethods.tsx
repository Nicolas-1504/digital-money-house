import { useRouter } from "next/router";
import React from "react";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { Stack, Typography } from "@mui/material";
import { ArrowForwardIconStyle } from "DMH/shared/styled/Cards";

const PayMethods = () => {
  const router = useRouter();

  return (
    <div style={{ cursor: "pointer" }} onClick={() => router.push("/cards")}>
      <SectionWrapper bgcolor="primary.main" color="grey.800">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={20} fontWeight={"bold"}>
            Gestioná los medios de pago
          </Typography>
          <ArrowForwardIconStyle />
        </Stack>
      </SectionWrapper>
    </div>
  );
};

export default PayMethods;
