import { Stack, styled, Box } from "@mui/material";

export const HorizontalStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
}));

export const HorizontalSpacedStack = styled(HorizontalStack)(({ theme }) => ({
  justifyContent: "space-between",
}));

export const HorizontalCenteredStack = styled(HorizontalStack)(({ theme }) => ({
  justifyContent: "center",
}));

export const HorizontalEndStack = styled(HorizontalStack)(({ theme }) => ({
  justifyContent: "flex-end",
}));

export const HorizontalStartStack = styled(HorizontalStack)(({ theme }) => ({
  justifyContent: "flex-start",
}));

export const BalanceBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "30px",
  padding: "0.5rem",
  width: "80%",
  maxWidth: "300px",
  display: "flex",
  justifyContent: "flex-end",
}));
