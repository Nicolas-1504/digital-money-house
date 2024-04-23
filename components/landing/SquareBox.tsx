import { theme } from "DMH/styles/theme";
import { Box, styled, Typography, Divider } from "@mui/material";

export type TSquare = {
  title: string;
  description: string;
};

const SquareBox = ({ title, description }: TSquare) => {
  return (
    <SquareBoxStyled>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "28px",
          lineHeight: "39px",
          "@media (min-width: 900px)": {
            fontSize: "40px",
            lineHeight: "55px",
          },
        }}
      >
        {title}
      </Typography>
      <Divider
        sx={{
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          margin: "12px 0",
        }}
      />
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "20px",
          lineHeight: "27px",
          "@media (min-width: 900px)": {
            fontSize: "16px",
            lineHeight: "22px",
          },
        }}
      >
        {description}
      </Typography>
    </SquareBoxStyled>
  );
};

export default SquareBox;

export const SquareBoxStyled = styled(Box)({
  backgroundColor: `${theme.palette.primary.contrastText}`,
  borderRadius: "25px",
  height: "100%",
  padding: "20px",
  width: "92%",
  zIndex: "0",
  "@media (min-width: 600px)": {
    width: "75%",
  },
  "@media (min-width: 900px)": {
    width: "60%",
  },
  "@media (min-width: 1200px)": {
    width: "100%",
  },
});
