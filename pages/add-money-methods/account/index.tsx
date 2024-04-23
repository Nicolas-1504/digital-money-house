import React, { useEffect, useState, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { getAuthStorage } from "DMH/utils/auth";
import MetadataHead from "DMH/shared/items/MetadataHead";

import AddMoneyFromAccountStepperForm from "DMH/components/addMoneyMethods/account/AddMoneyFromAccountStepperForm";
import { TransferenceProvider } from "DMH/context/addMoneyFromAccount/AddMoneyFromAccountContext";

const AddMoneyFromAccountMethodPage: NextPage = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);

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
        title="DMH | Cargar dinero"
        content="Realiza una transferencia a otra cuenta."
      />
      {permission && (
        <TransferenceProvider>
          <AddMoneyFromAccountStepperForm />
        </TransferenceProvider>
      )}
    </>
  );
};

export default AddMoneyFromAccountMethodPage;
