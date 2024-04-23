import ChargeAmount from "DMH/components/addMoneyMethods/card/ChargeAmount";
import { ChargeAmountCardProvider } from "DMH/context/chargeAmountCard/chargeAmountCardContext";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { getAuthStorage } from "DMH/utils/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddMoneyFromCardMethodPage = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);

  useEffect(() => {
    const token = getAuthStorage();
    token && setPermission(true);
    !token && router.push("/");
  }, [router]);

  return (
    <>
      <MetadataHead
        title="DMH | Cargar dinero"
        content="Acá encontrarás la manera de cargar dinero a tu cuenta a través de una tarjeta."
      />
      {permission && (
        <ChargeAmountCardProvider>
          <ChargeAmount />
        </ChargeAmountCardProvider>
      )}
    </>
  );
};

export default AddMoneyFromCardMethodPage;
