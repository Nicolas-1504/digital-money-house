import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import { getAuthStorage } from "DMH/utils/auth";
import { getAccount, getTransactions } from "DMH/services/account.service";
import { IAccount, ITransaction } from "DMH/utils/types/account.types";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import SearchBar from "DMH/shared/items/SearchBar";
import AccountInfo from "DMH/components/home/AccountInfo";
import AccountActivity from "DMH/components/home/AccountActivity";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import MetadataHead from "DMH/shared/items/MetadataHead";
import { activityFilters } from "DMH/utils/activityFilters";
import useActivity from "DMH/context/activity/useActivity";

const Home: NextPage = () => {
  const { filterInfo } = useActivity();
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [account, setAccount] = useState<IAccount>();
  const [transactions, setTransactions] = useState<ITransaction[] | []>([]);

  const getUserAccount = async () => {
    const userAccount = await getAccount();
    if (!userAccount) {
      router.push("/login");
    } else {
      setAccount(userAccount);
    }
  };

  const getUserTransactions = async (accountId: number) => {
    const userTransactions = await getTransactions(accountId);
    if (!userTransactions) {
      router.push("/login");
    } else {
      setTransactions(userTransactions.reverse());
    }
  };

  useEffect(
    () => {
      const token = getAuthStorage();
      token && setPermission(true);
      token && getUserAccount();
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const token = getAuthStorage();
      token && account && getUserTransactions(account.id);
    },
    // eslint-disable-next-line
    [account]
  );

  return (
    <>
      <MetadataHead
        title="DMH - Inicio"
        content="Realizá transferencias, pagá servicios, cargá dinero, revisá tu actividad, asociá tus tarjetas y mucho más."
      />

      {permission && (
        <MainBody>
          <SectionIndexMobile section={"Inicio"} />
          <AccountInfo account={account} />
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PrimaryButton variant="contained" href="/add-money-methods">
                  Ingresar dinero
                </PrimaryButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <PrimaryButton variant="contained" href="/pay-services">
                  Pago de servicios
                </PrimaryButton>
              </Grid>
            </Grid>
            <SearchBar transactions={transactions} />
            <AccountActivity
              transactions={activityFilters({ transactions, filterInfo })}
            />
          </Stack>
        </MainBody>
      )}
    </>
  );
};

export default Home;
