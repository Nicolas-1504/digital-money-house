import React, { useEffect, useState, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Typography, Alert } from "@mui/material";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import AddNewCard from "DMH/components/addNewCard/AddNewCard";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import ListItemCard from "DMH/components/listItem-card/ListItemCard";
import { getCards } from "DMH/services/card.service";
import { ICard } from "DMH/utils/types/card.types";
import { getAuthStorage } from "DMH/utils/auth";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { AccountContext } from "DMH/context/account/AccountContext";

const Cards: NextPage = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[] | []>([]);
  const [cardDelete, setCardDelete] = useState<boolean>(false);
  const { cardsAmount, setCardsAmount } = useContext(AccountContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    (cardsAmount as number) > 9 && cardsAmount !== null
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [cardsAmount]);

  const getAllCards = async () => {
    setCards(await getCards());
  };

  useEffect(
    () => {
      const token = getAuthStorage();
      token && setPermission(true);
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      setCardsAmount(cards.length);
    },
    // eslint-disable-next-line
    [cards]
  );

  useEffect(() => {
    const token = getAuthStorage();
    token && getAllCards();
  }, [cardDelete]);

  return (
    <>
      <MetadataHead
        title="DMH | Tarjetas"
        content="Tarjetas de débito o crédito disponibles para usar en la billetera virtual."
      />
      {permission && (
        <MainBody>
          <SectionIndexMobile section={"Tarjetas"} />
          <AddNewCard />
          {isDisabled && (
            <>
              <Alert
                variant="outlined"
                severity="info"
                sx={{ marginBottom: "10px" }}
              >
                Cantidad máxima de tarjetas permitidas: 10
              </Alert>
              <Alert
                variant="outlined"
                severity="error"
                sx={{ marginBottom: "10px" }}
              >
                Alcanzaste la cantidad máxima de tarjetas permitidas, debes
                eliminar alguna para poder dar de alta una nueva
              </Alert>
            </>
          )}
          <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
            <>
              <Typography
                variant="h5"
                sx={{
                  borderBottom: "1px solid #EEEAEA",
                  paddingBottom: "15px",
                }}
              >
                Tus tarjetas
              </Typography>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <ListItemCard
                    card={card}
                    key={card.id}
                    cardDelete={cardDelete}
                    setCardDelete={setCardDelete}
                  />
                ))
              ) : (
                <Typography sx={{ marginTop: "20px" }}>
                  No tienes tarjetas asociadas
                </Typography>
              )}
            </>
          </SectionWrapper>
        </MainBody>
      )}
    </>
  );
};

export default Cards;
