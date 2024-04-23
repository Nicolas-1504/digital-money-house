import React, { useState } from "react";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { Snackbar, Stack, Typography } from "@mui/material";
import { CopyIconStyle } from "DMH/shared/styled/ProfileComponents";
import { getAccountStorage } from "DMH/utils/account";
import { theme } from "DMH/styles/theme";

const Clipboard = () => {
  const [open, setOpen] = useState(false);

  const account = getAccountStorage();

  const itemsCopy = {
    cvu: account?.cvu,
    alias: account?.alias,
  };

  const copyToClipboard = async (item: "cvu" | "alias") => {
    setOpen(true);
    return await navigator.clipboard.writeText(itemsCopy[item]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
        <Typography fontWeight={"bold"} fontSize={14}>
          Copia tu cvu o alias para ingresar o transferir dinero desde otra
          cuenta
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={"40px"}
          sx={{
            borderBottom: "1px solid #CECECE",
            paddingBottom: "40px",
            [theme.breakpoints.up("sm")]: {
              borderBottom: "none",
              paddingBottom: "0",
            },
          }}
        >
          <Stack>
            <Typography
              fontWeight={"bold"}
              fontSize={18}
              color={"primary.main"}
            >
              CVU
            </Typography>
            <Typography fontSize={14}>{account?.cvu}</Typography>
          </Stack>
          <CopyIconStyle onClick={() => copyToClipboard("cvu")} />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={"40px"}
        >
          <Stack>
            <Typography
              fontWeight={"bold"}
              fontSize={18}
              color={"primary.main"}
            >
              Alias
            </Typography>
            <Typography fontSize={14}>{account?.alias}</Typography>
          </Stack>
          <CopyIconStyle onClick={() => copyToClipboard("alias")} />
        </Stack>
      </SectionWrapper>
      <Snackbar
        sx={{
          marginBottom: 8,
          [`& .MuiPaper-root`]: { display: "flex", justifyContent: "center" },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        message="Copiado al portapapeles"
      />
    </>
  );
};

export default Clipboard;
