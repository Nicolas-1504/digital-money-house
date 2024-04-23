import React, { FC, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { IAccount } from "DMH/utils/types/account.types";
import Spinner from "DMH/shared/items/Spinner";
import {
  BalanceBox,
  HorizontalEndStack,
  HorizontalStartStack,
} from "DMH/shared/styled/containers";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

interface IAccountInfoProps {
  account: IAccount | undefined;
}

const AccountInfo: FC<IAccountInfoProps> = ({ account }) => {
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      {account ? (
        <>
          <HorizontalEndStack sx={{ gap: 2, paddingBottom: "2rem" }}>
            <Link
              href={{
                pathname: "/cards",
              }}
            >
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/cards")}
              >
                Ver tarjetas
              </Typography>
            </Link>
            <Link
              href={{
                pathname: "/profile",
              }}
            >
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/profile")}
              >
                Ver CVU
              </Typography>
            </Link>
          </HorizontalEndStack>
          <Typography component="h5" variant="h5" sx={{ pb: "0.5rem" }}>
            Dinero disponible
          </Typography>
          <HorizontalStartStack>
            <BalanceBox>
              <Typography sx={{ width: "fit-content" }} variant="h3">
                {show
                  ? "$" + account?.available_amount.toLocaleString("es-ES")
                  : "●●●●●●●●●●"}
              </Typography>
            </BalanceBox>
            {show ? (
              <IconButton onClick={() => setShow(false)}>
                <VisibilityOff sx={{ color: "grey.200" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => setShow(true)}>
                <Visibility sx={{ color: "grey.200" }} />
              </IconButton>
            )}
          </HorizontalStartStack>
        </>
      ) : (
        <Spinner />
      )}
    </SectionWrapper>
  );
};

export default AccountInfo;
