import { Button, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  height: "60px",
  width: "100%",
  color: theme.palette.grey[800],
  borderRadius: "6px",
  fontWeight: "bold",
  textTransform: "none",
  "&:disabled": {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[700],
  },
}));
