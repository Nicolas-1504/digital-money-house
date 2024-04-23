import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import moment from "moment";
import "moment/locale/es";
import { ITransaction } from "DMH/utils/types/account.types";
import { TransactionAvatar } from "DMH/shared/styled/avatars";
import {
  HorizontalCenteredStack,
  HorizontalSpacedStack,
  HorizontalStack,
} from "DMH/shared/styled/containers";
import { useRouter } from "next/router";

interface IListOfTransactionsProps {
  listOfTransactions: ITransaction[] | [];
}

const ListOfTransactions: FC<IListOfTransactionsProps> = ({
  listOfTransactions,
}) => {
  const router = useRouter();
  return (
    <Stack>
      {listOfTransactions.length > 0 ? (
        listOfTransactions.map((transaction) => (
          <Box
            key={transaction.id}
            onClick={() => {
              router.push({
                pathname: "/activity/detail",
                query: { id: JSON.stringify(transaction.id) },
              });
            }}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: " rgba(76, 175, 80, 0.03)",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
              },
            }}
          >
            <HorizontalSpacedStack sx={{ pt: "1.5rem", pb: "1.5rem" }}>
              <HorizontalStack sx={{ gap: "1rem" }}>
                <TransactionAvatar />
                <Typography>{transaction.description}</Typography>
              </HorizontalStack>
              <Stack sx={{ alignItems: "flex-end" }}>
                <Typography>
                  ${transaction.amount.toLocaleString("es-ES")}
                </Typography>
                <Typography color="grey.400">
                  {moment(transaction.dated).locale("es").format("dddd")}
                </Typography>
              </Stack>
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
              No hay transacciones registradas
            </Typography>
          </HorizontalCenteredStack>
          <Divider />
        </>
      )}
    </Stack>
  );
};

export default ListOfTransactions;
