import RegisterForm from "DMH/components/register/RegisterForm";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { getAuthStorage } from "DMH/utils/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);

  useEffect(
    () => {
      const token = getAuthStorage();
      !token && setPermission(true);
      token && router.push("/home");
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <MetadataHead
        title="DMH | Registro"
        content="Completá el formulario con tus datos para crear tu cuenta."
      />
      {permission && <RegisterForm />}
    </>
  );
};

export default Register;
