import { Stack, Typography, Button, styled } from "@mui/material";

export const HeaderCardStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0 0 23px",
  [theme.breakpoints.down(940)]: {
    flexDirection: "column-reverse",
    width: "fit-content",
    gap: "10px",
  },
}));

export const StatusStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.primary.main,
  gap: "12px",
}));

export const DateTypography = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  fontSize: "16px",
}));

export const TypographySize16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "400",
}));

export const TypographySize20Green = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  color: theme.palette.primary.main,
  marginBottom: "30px",
}));

export const TypographySize24Green = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "700",
  color: theme.palette.primary.main,
  marginBottom: "30px",
}));

export const ButtonsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));

export const ButtonActivityDetail = styled(Button)(({ theme }) => ({
  width: "233px",
  height: "60px",
  color: theme.palette.grey[800],
  borderRadius: "10px",
  fontWeight: "bold",
  textTransform: "none",
  [theme.breakpoints.down(940)]: {
    width: "100%",
  },
}));
