import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import LoginStepperForm from "DMH/components/login/LoginStepperForm";
import { LoginProvider } from "DMH/context/login/loginContext";
import Head from "next/head";
import { getAuthStorage } from "DMH/utils/auth";
import { useRouter } from "next/router";
import MetadataHead from "DMH/shared/items/MetadataHead";

const Login: NextPage = () => {
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
        title="DMH | Iniciar sesión"
        content="Ingresá tu email y contraseña para loguearte a tu cuenta."
      />
      {permission && (
        <LoginProvider>
          <LoginStepperForm />
        </LoginProvider>
      )}
    </>
  );
};

export default Login;
