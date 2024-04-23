import MainBody from "DMH/shared/layouts/Body/MainBody";
import React from "react";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import Clipboard from "./Clipboard";
import PayMethods from "./PayMethods";
import ProfileData from "./ProfileData";

const Profile = () => {
  return (
    <MainBody>
      <SectionIndexMobile section={"Perfil"} />
      <ProfileData />
      <PayMethods />
      <Clipboard />
    </MainBody>
  );
};

export default Profile;
