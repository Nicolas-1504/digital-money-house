import React from "react";
import { FC, PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import HeaderGrey from "DMH/shared/layouts/Headers/HeaderGrey";
import Footer from "DMH/shared/layouts/Footer/Footer";
import { useRouter } from "next/router";
import HeaderAccount from "./Headers/HeaderAccount";

const LayoutGeneral: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const router = useRouter();
  const pathname: string = router.asPath;

  return (
    <Stack direction={"column"} height={"100%"}>
      {pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/successful_register" ? (
        <HeaderAccount />
      ) : (
        <HeaderGrey />
      )}
      <Box display={"flex"} flexGrow={1} justifyContent={"center"}>
        {children}
      </Box>
      <Footer />
    </Stack>
  );
};
export default LayoutGeneral;
