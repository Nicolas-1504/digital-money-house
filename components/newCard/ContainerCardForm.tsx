import { styled } from "@mui/material";
import { Stack } from "@mui/material";

const ContainerCardForm = styled(Stack)(({ theme }) => ({
  borderRadius: "8px",
  padding: "22px",
  [theme.breakpoints.up("sm")]: {
    padding: "48px 76px 34px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "30px 96px",
  },
}));

export default ContainerCardForm;