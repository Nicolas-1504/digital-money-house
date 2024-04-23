import { Stack, Theme, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { theme } from "DMH/styles/theme";

export type SectionIndexProps = {
  section: string;
};

const SectionIndexMobile = ({ section }: SectionIndexProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      mb={2}
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <ArrowForwardRoundedIcon sx={{ color: "grey.400" }} />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "600",
          textDecorationLine: "underline",
          color: (theme: Theme) => theme.palette.grey[400],
        }}
      >
        {section}
      </Typography>
    </Stack>
  );
};

export default SectionIndexMobile;
