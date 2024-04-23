import Profile from "DMH/components/profile/Profile";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { getAuthStorage } from "DMH/utils/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
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
        title="DMH | Tu perfil"
        content="Acá encontrarás información acerca de tu perfil."
      />
      {permission && <Profile />}
    </>
  );
};

export default MyProfile;
