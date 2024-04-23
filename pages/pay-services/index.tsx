import PayServicesForm from "DMH/components/payServices/PayServicesForm";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { getAuthStorage } from "DMH/utils/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainBody from "DMH/shared/layouts/Body/MainBody";

const PayServices = () => {
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
        title="DMH | Pagar servicios"
        content="Acá encontrarás los servicios que puedes pagar."
      />
      {permission && (
        <MainBody>
          <PayServicesForm />
        </MainBody>
      )}
    </>
  );
};

export default PayServices;
