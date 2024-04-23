import { Avatar, styled } from "@mui/material";

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.grey[800],
  fontWeight: "600",
}));

export const TransactionAvatar = styled(UserAvatar)(({ theme }) => ({
  width: 30,
  height: 30,
}));
