import React from "react";
import { Stack, Divider, Typography } from "@mui/material";
import SearchService from "DMH/components/payServices/SearchService";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import ListOfServices from "DMH/components/payServices/ListOfServices";
import { servicesFilter } from "DMH/utils/servicesFilter";
import services from "DMH/utils/json/services.json";
import usePayServices from "DMH/context/payServices/usePayServices";

const SelectService = () => {
  const { state } = usePayServices();
  return (
    <Stack spacing={2}>
      <SearchService placeholder="Buscá entre más de 5.000 empresas" />
      <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
        <Typography component="h5" variant="h5" sx={{ pb: "1rem" }}>
          Servicios disponibles
        </Typography>
        <Divider />
        <ListOfServices listOfServices={servicesFilter({ services, state })} />
      </SectionWrapper>
    </Stack>
  );
};

export default SelectService;
