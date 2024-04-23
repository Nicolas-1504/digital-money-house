import { Grid, RadioGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { AccountContext } from "DMH/context/account/AccountContext";
import useChargeAmountCard from "DMH/context/chargeAmountCard/useChargeAmountCard";
import { getCards } from "DMH/services/card.service";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { AddCircleOutlineIconStyle } from "DMH/shared/styled/Cards";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { isExpired } from "DMH/utils/cards";
import { ICard } from "DMH/utils/types/card.types";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CardListSelectItem from "./CardListSelectItem";

const SelectCard = () => {
  const [cards, setCards] = useState<ICard[] | undefined>(undefined);
  const [numberId, setNumberId] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const { state, dispatch } = useChargeAmountCard();
  const router = useRouter();
  const { cardsAmount, setCardsAmount } = useContext(AccountContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberId((event.target as HTMLInputElement).value);
    setExpirationDate((event.target as HTMLInputElement).value.slice(-7));
    dispatch({
      type: "SET_ID_NUMBER",
      payload: Number((event.target as HTMLInputElement).value.slice(-11, -7)),
    });
  };

  useEffect(() => {
    setCardsAmount(cards?.length || null);
    // eslint-disable-next-line
  }, [cards]);

  useEffect(() => {
    (cardsAmount as number) > 9 && cardsAmount !== null
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [cardsAmount]);

  useEffect(() => {
    getCards()
      .then((data) => setCards(data))
      .catch(() => setCards(undefined));
  }, []);

  return (
    <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
      <Typography
        fontSize={20}
        fontWeight={"bold"}
        color={"#C1FD35"}
        marginBottom={"25px"}
      >
        Seleccionar tarjeta
      </Typography>
      <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
        <Typography variant={"h5"}>Tus tarjetas</Typography>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={numberId}
          onChange={handleChange}
        >
          {cards &&
            cards?.map((card) => {
              return (
                <CardListSelectItem key={card?.id} card={card} selectCard />
              );
            })}
        </RadioGroup>
      </SectionWrapper>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <div onClick={() => !isDisabled && router.push("/cards/new")}>
            <Stack
              direction={"row"}
              alignItems="center"
              sx={{
                cursor: !isDisabled ? "pointer" : "default",
              }}
            >
              <AddCircleOutlineIconStyle
                style={{
                  color: isDisabled ? "#AEADAD" : "#C1FD35",
                }}
              />
              <Typography
                sx={{
                  color: isDisabled ? "#AEADAD" : "#C1FD35",
                  textDecoration: isDisabled ? "none" : "underline",
                }}
                variant="h5"
              >
                Nueva tarjeta
              </Typography>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={0} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <PrimaryButton
            disabled={!numberId || isExpired(expirationDate)}
            style={
              !numberId || isExpired(expirationDate)
                ? {
                    backgroundColor: "#CECECE",
                    color: "#000",
                  }
                : undefined
            }
            variant="contained"
            onClick={() =>
              dispatch({
                type: "SET_STEP",
                payload: state.activeStep + 1,
              })
            }
          >
            Continuar
          </PrimaryButton>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default SelectCard;
