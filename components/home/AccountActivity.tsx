import React, { FC } from "react";
import { useRouter } from "next/router";
import { Divider, Typography } from "@mui/material";
import "moment/locale/es";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { ITransaction } from "DMH/utils/types/account.types";
import { ArrowForwardIconStyle } from "DMH/shared/styled/Cards";
import { HorizontalSpacedStack } from "DMH/shared/styled/containers";
import ListOfTransactions from "DMH/shared/items/ListOfTransactions";

interface IAccountActivityProps {
  transactions: ITransaction[] | [];
}

const AccountActivity: FC<IAccountActivityProps> = ({ transactions }) => {
  const router = useRouter();
  const lastTransactions =
    transactions.length > 10 ? transactions.slice(0, 10) : transactions;

  return (
    <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
      <Typography component="h5" variant="h5" sx={{ pb: "1rem" }}>
        Tu actividad
      </Typography>
      <Divider />
      <ListOfTransactions listOfTransactions={lastTransactions} />
      <HorizontalSpacedStack
        sx={{ paddingTop: "1rem", cursor: "pointer" }}
        onClick={() => router.push("/activity")}
      >
        <Typography component="h6" variant="h6">
          Ver toda tu actividad
        </Typography>
        <ArrowForwardIconStyle styles={{ fontSize: "20px" }} />
      </HorizontalSpacedStack>
    </SectionWrapper>
  );
};

export default AccountActivity;
