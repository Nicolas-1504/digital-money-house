import React, { FC } from "react";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import { theme } from "DMH/styles/theme";

const Footer: FC = () => {
  return (
    <Box
      component={"footer"}
      display={"flex"}
      p={"1rem 0"}
      alignItems="center"
      justifyContent={"center"}
      sx={{
        backgroundColor: theme.palette.grey[600],
        height: "64px",
        zIndex: "9999",
        [theme.breakpoints.down("sm")]: {
          zIndex: "1",
        },
      }}
    >
      <Link
        href="https://www.digitalhouse.com"
        target="_blank"
        rel="noopener noreferrer"
        display={"flex"}
        flexGrow={1}
        alignItems={"center"}
        marginLeft="20px"
        color={theme.palette.primary.main}
        sx={{
          textDecoration: "none",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            marginLeft: "0px",
          },
        }}
      >
        © 2022 Digital Money House
      </Link>
    </Box>
  );
};
export default Footer;
