import { Box, styled } from "@mui/material";

export const FilterTag = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  color: theme.palette.grey[100],
  cursor: "pointer",
  borderRadius: "3px",
  fontWeight: "bold",
  fontStyle: "italic",
  lineHeight: "140%",
  padding: "6px 16px",
  margin: "4px",
  "&:hover": {
    ".css-ptiqhd-MuiSvgIcon-root": {
      color: theme.palette.primary.main
    }
  },
}));