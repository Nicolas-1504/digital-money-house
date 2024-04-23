import { Box, styled } from "@mui/material";
import { theme } from "DMH/styles/theme";

export const GreenBoxStyled = styled(Box)({
  backgroundColor: `${theme.palette.primary.main}`,
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "30px 30px 0px 0px",
  height: "calc(100% - 71px)",
  position: "absolute",
  bottom: "0",
  width: "100vw",
  zIndex: "-1",
  "@media (min-width: 900px)": {
    height: "calc(100% - 87px)",
  },
});
