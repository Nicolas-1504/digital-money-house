import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import { ArrowForwardIconStyle } from "DMH/shared/styled/Cards";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import { useRouter } from "next/router";
import { CardIcon, UserIcon } from "public/icons";
import React from "react";

const AddMoneyMethods = () => {
  const router = useRouter();

  return (
    <MainBody>
      <SectionIndexMobile section={"Cargar dinero"} />
      <div
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/add-money-methods/account")}
      >
        <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} columnGap={"10px"}>
              <UserIcon width={34} height={34} />

              <Typography fontSize={20} fontWeight={"bold"} color={"#C1FD35"}>
                Transferencia bancaria
              </Typography>
            </Stack>
            <ArrowForwardIconStyle
              styles={{
                color: "#C1FD35",
              }}
            />
          </Stack>
        </SectionWrapper>
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/add-money-methods/card")}
      >
        <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} columnGap={"10px"}>
              <CardIcon width={36} height={34} />

              <Typography fontSize={20} fontWeight={"bold"} color={"#C1FD35"}>
                Seleccionar tarjeta
              </Typography>
            </Stack>
            <ArrowForwardIconStyle
              styles={{
                color: "#C1FD35",
              }}
            />
          </Stack>
        </SectionWrapper>
      </div>
    </MainBody>
  );
};

export default AddMoneyMethods;
