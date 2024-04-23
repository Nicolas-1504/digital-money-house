import AddMoneyMethods from "DMH/components/addMoneyMethods/AddMoneyMethods";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { getAuthStorage } from "DMH/utils/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddMoneyMethodsPage = () => {
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
        content="Acá encontrarás los metodos posibles para cargar dinero a tu cuenta."
      />
      {permission && <AddMoneyMethods />}
    </>
  );
};

export default AddMoneyMethodsPage;
