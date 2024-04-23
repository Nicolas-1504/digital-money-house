import { useState, useEffect, ChangeEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Pagination,
  Stack,
  Divider,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { usePagination } from "../../hooks/usePagination";
import { getAuthStorage } from "DMH/utils/auth";
import { getAccount, getTransactions } from "DMH/services/account.service";
import { IAccount, ITransaction } from "DMH/utils/types/account.types";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import SectionIndexMobile from "DMH/shared/items/SectionIndexMobile";
import MetadataHead from "DMH/shared/items/MetadataHead";
import "moment/locale/es";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import ListOfTransactions from "DMH/shared/items/ListOfTransactions";
import SearchBar from "DMH/shared/items/SearchBar";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Grid from "@mui/material/Unstable_Grid2";
import TransitionsModal from "DMH/shared/items/TransitionsModal";
import VerticalTabs from "DMH/components/activity/VerticalTabs";
import { activityFilters } from "DMH/utils/activityFilters";
import useActivity from "DMH/context/activity/useActivity";
import { filterInitialState } from "DMH/context/activity/ActivityContext";
import FilterTagList from "DMH/components/activity/FilterTagList";

const Activity: NextPage = () => {
  const { filterInfo, dispatch } = useActivity();
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [account, setAccount] = useState<IAccount>();
  const [modal, setModal] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransaction[] | []>([]);
  const PER_PAGE = 10;

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

  const { jump, currentData, currentPage, maxPage } = usePagination(
    activityFilters({ transactions, filterInfo }),
    PER_PAGE
  );

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    jump(page);
  };

  return (
    <>
      <MetadataHead
        title="DMH - Actividad"
        content="Visualizá toda la actividad realizada con tu billetera virtual."
      />

      {permission && (
        <MainBody>
          <SectionIndexMobile section={"Tu actividad"} />
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6} md={8} xl={9}>
                <SearchBar
                  placeholder="Buscar en tu actividad"
                  transactions={transactions}
                />
              </Grid>
              <Grid xs={12} sm={6} md={4} xl={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                  spacing={2}
                  sx={{ height: "100%" }}
                >
                  <PrimaryButton
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      setModal(true);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box>Filtrar</Box> <FilterAltIcon />
                    </Stack>
                  </PrimaryButton>
                  <Tooltip title="Borrar filtros">
                    <Box>
                      <PrimaryButton
                        variant="contained"
                        color="secondary"
                        startIcon={<FilterAltOffIcon />}
                        disabled={
                          JSON.stringify(filterInfo) ===
                          JSON.stringify(filterInitialState)
                        }
                        onClick={() => {
                          dispatch({ type: "DELETE_FILTERS" });
                        }}
                        sx={{
                          width: "min-content",
                          height: "100%",
                          ".css-1d6wzja-MuiButton-startIcon": {
                            margin: "0",
                          },
                        }}
                      ></PrimaryButton>
                    </Box>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
            {JSON.stringify(filterInfo) !==
              JSON.stringify(filterInitialState) && <FilterTagList />}
            <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
              <Typography component="h5" variant="h5" sx={{ pb: "1rem" }}>
                Tu actividad
              </Typography>
              <Divider />
              <ListOfTransactions listOfTransactions={currentData()} />
              <Pagination
                count={maxPage}
                page={currentPage}
                shape="rounded"
                onChange={handleChange}
                sx={{
                  paddingTop: "1.5rem",
                  ul: { justifyContent: "center" },
                  button: { fontWeight: "700" },
                }}
              />
            </SectionWrapper>
          </Stack>
          {modal && (
            <TransitionsModal open={modal} setOpen={setModal}>
              <VerticalTabs setModal={setModal} />
            </TransitionsModal>
          )}
        </MainBody>
      )}
    </>
  );
};

export default Activity;
