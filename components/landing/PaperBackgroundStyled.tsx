import { Paper, styled } from "@mui/material";

export const PaperBackgroundStyled = styled(Paper)({
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "80%",
  backgroundPositionY: "-64px",
  backgroundSize: "cover",
  borderRadius: "0",
  height: "100%",
  minHeight: "calc(100vh - 128px)",
  marginTop: "64px",
  position: "relative",
  width: "100%",
  zIndex: "-2",
  "@media (min-width: 600px)": {
    backgroundPositionX: "30%",
    backgroundPositionY: "0",
  },
  "@media (min-width: 1200px)": {
    height: "calc(100vh - 128px)",
  },
});
