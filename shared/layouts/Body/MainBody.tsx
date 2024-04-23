import { Toolbar } from "@mui/material";
import Sidebar from "DMH/components/sidebar/Sidebar";
import { BodyWithSidebar } from "DMH/shared/styled/BodyWithSidebar";
import React, { ReactNode } from "react";
import { PayServicesProvider } from "DMH/context/payServices/PayServicesContext";

interface MainBodyProps {
  children: ReactNode;
}

const MainBody = ({ children }: MainBodyProps) => {
  return (
    <PayServicesProvider>
      <Sidebar />
      <BodyWithSidebar>
        <Toolbar />
        {children}
      </BodyWithSidebar>
    </PayServicesProvider>
  );
};

export default MainBody;
