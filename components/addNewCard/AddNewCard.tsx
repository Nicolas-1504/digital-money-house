import React, { FC, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import {
  StackAddCard,
  AddCircleOutlineIconStyle,
  ArrowForwardIconStyle,
  TitleAddNewCard,
} from "DMH/shared/styled/Cards";
import { AccountContext } from "DMH/context/account/AccountContext";

const AddNewCard: FC = () => {
  const { cardsAmount } = useContext(AccountContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    (cardsAmount as number) > 9 && cardsAmount !== null
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [cardsAmount]);

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      <TitleAddNewCard>Agregá tu tarjeta de débito o crédito</TitleAddNewCard>
      <Link
        href={{
          pathname: "/cards/new",
        }}
      >
        <StackAddCard
          sx={
            isDisabled
              ? { color: "grey.300", pointerEvents: "none" }
              : { pointerEvents: "visible" }
          }
        >
          <Stack direction={"row"} alignItems="center">
            <AddCircleOutlineIconStyle />
            <Typography variant="h5">Nueva tarjeta</Typography>
          </Stack>
          <ArrowForwardIconStyle />
        </StackAddCard>
      </Link>
    </SectionWrapper>
  );
};

export default AddNewCard;
