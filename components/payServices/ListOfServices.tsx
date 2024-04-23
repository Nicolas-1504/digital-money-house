import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import {
  HorizontalCenteredStack,
  HorizontalSpacedStack,
  HorizontalStack,
} from "DMH/shared/styled/containers";
import { useRouter } from "next/router";
import { TService } from "DMH/utils/types/service.types";
import Image from "next/image";
import { DeleteButton } from "DMH/shared/styled/Cards";
import usePayServices from "DMH/context/payServices/usePayServices";
import { theme } from "DMH/styles/theme";

interface IListOfServicesProps {
  listOfServices: TService[] | [];
}

const ListOfServices: FC<IListOfServicesProps> = ({ listOfServices }) => {
  const router = useRouter();
  const { dispatch } = usePayServices();
  const handleSelect = (service: TService) => {
    dispatch({ type: "SET_STEP", payload: 1 });
    router.push({
      query: { id: JSON.stringify(service.id) },
    });
    dispatch({ type: "SET_SERVICE", payload: service.name });
  };
  return (
    <Stack
      sx={{
        height: "100%",
        maxHeight: "calc(100vh - 360px)",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.grey[200],
          borderRadius: "8px",
        },
      }}
    >
      {listOfServices.length > 0 ? (
        listOfServices.map((service) => (
          <Box
            key={service.id}
            sx={{
              marginRight: "8px",
            }}
          >
            <HorizontalSpacedStack sx={{ pt: "1.5rem", pb: "1.5rem" }}>
              <HorizontalStack
                justifyContent="space-between"
                sx={{ gap: "1rem", width: "100%" }}
              >
                <HorizontalStack sx={{ gap: "1rem" }}>
                  <Image
                    src={service.img}
                    alt="Picture of the author"
                    width={75}
                    height={65}
                    objectFit="contain"
                  />
                  <Typography variant="body1" color="grey.500">
                    {service.name}
                  </Typography>
                </HorizontalStack>
                <DeleteButton
                  sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                  onClick={() => handleSelect(service)}
                >
                  Seleccionar
                </DeleteButton>
              </HorizontalStack>
            </HorizontalSpacedStack>
            <Divider />
          </Box>
        ))
      ) : (
        <>
          <HorizontalCenteredStack
            sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
          >
            <Typography variant="body2" color="grey.500">
              Servicio no disponible para pagar
            </Typography>
          </HorizontalCenteredStack>
          <Divider />
        </>
      )}
    </Stack>
  );
};

export default ListOfServices;
