import { theme } from "DMH/styles/theme";
import { Box, Stack, Typography, Divider } from "@mui/material";

export type TSlogan = {
  whitePhrase: string;
  greenNormalPhrase: string;
  greenStrongPhrase: string;
};

const Slogan = ({
  whitePhrase,
  greenNormalPhrase,
  greenStrongPhrase,
}: TSlogan) => {
  return (
    <Stack
      direction="column"
      sx={{
        margin: "50px 20px 115px",
        width: "41%",
        "@media (min-width: 600px)": {
          margin: "85px 50px 250px",
          width: "55%",
          gap: "16px",
        },
        "@media (min-width: 900px)": {
          marginBottom: "0",
          width: "35%",
        },
      }}
    >
      <Typography
        sx={{
          color: `${theme.palette.primary.contrastText}`,
          fontWeight: "600",
          fontSize: "27px",
          lineHeight: "32px",
          "@media (min-width: 600px)": {
            fontWeight: "400",
            fontSize: "48px",
            lineHeight: "50px",
          },
        }}
      >
        {whitePhrase}
      </Typography>
      <Divider
        sx={{
          borderBottom: `4px solid ${theme.palette.primary.main}`,
          margin: "20px 0",
          width: "25px",
          "@media (min-width: 600px)": {
            display: "none",
          },
        }}
      />
      <Typography
        sx={{
          color: `${theme.palette.primary.main}`,
          fontWeight: "400",
          fontSize: "21.5px",
          lineHeight: "30.5px",
          "@media (min-width: 600px)": {
            fontSize: "34px",
            lineHeight: "50px",
          },
        }}
      >
        {greenNormalPhrase}
        <Box component="span" fontWeight="700">
          {greenStrongPhrase}
        </Box>
      </Typography>
    </Stack>
  );
};

export default Slogan;
