import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import { getAuthStorage } from "DMH/utils/auth";
import React from "react";
import NewCardForm from "DMH/components/newCard/NewCardForm";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { AccountContext } from "DMH/context/account/AccountContext";

const NewCard: NextPage = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const { cardsAmount } = useContext(AccountContext);

  useEffect(
    () => {
      ((cardsAmount as number) > 9 || cardsAmount === null) &&
        router.push("/cards");
    },
    // eslint-disable-next-line
    [cardsAmount]
  );

  useEffect(
    () => {
      const token = getAuthStorage();
      token && setPermission(true);
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <MetadataHead
        title="DMH - Nueva tarjeta"
        content="Agregar una tarjeta de débito o crédito para usarla para cargar saldo o pagar servicios"
      />
      {permission && (
        <MainBody>
          <SectionIndexMobile section={"Tarjetas"} />
          <NewCardForm />
        </MainBody>
      )}
    </>
  );
};

export default NewCard;
