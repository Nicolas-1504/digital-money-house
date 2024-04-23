import { useState, useEffect } from "react";
import { NextPage } from "next";
import { getAuthStorage } from "DMH/utils/auth";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { Divider, Stack, Typography, Modal, Button } from "@mui/material";
import Spinner from "DMH/shared/items/Spinner";
import { useRouter } from "next/router";
import MetadataHead from "DMH/shared/items/MetadataHead";
import MainBody from "DMH/shared/layouts/Body/MainBody";
import { getAccount, getTransaction } from "DMH/services/account.service";
import { IAccount, ITransaction } from "DMH/utils/types/account.types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import moment from "moment";
import "moment/locale/es";
import {
  HeaderCardStack,
  StatusStack,
  DateTypography,
  TypographySize16,
  TypographySize20Green,
  TypographySize24Green,
  ButtonsContainer,
  ButtonActivityDetail,
} from "DMH/shared/styled/ActvityDetail";

const ActivityDetail: NextPage = () => {
  const router = useRouter();
  const { id }: any = router?.query;

  const [permission, setPermission] = useState<boolean>(false);
  const [account, setAccount] = useState<IAccount>();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTransactionDetail = async (
    accountId: number,
    transactionId: string
  ) => {
    const TransactionDetail = await getTransaction(accountId, transactionId);
    if (!TransactionDetail) {
      router.push("/activity");
    } else {
      setTransaction(TransactionDetail);
      setLoading(false);
    }
  };

  const getUserAccount = async () => {
    const userAccount = await getAccount();
    if (!userAccount) {
      router.push("/login");
    } else {
      setAccount(userAccount);
    }
  };

  useEffect(
    () => {
      const token = getAuthStorage();
      token && setPermission(true);
      token && getUserAccount();
      setLoading(true);
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const token = getAuthStorage();
      token && account && getTransactionDetail(account.id, id);
    },
    // eslint-disable-next-line
    [account]
  );

  const generateTicket = () => {
    typeof window === "undefined" ? undefined : window.print();
  };

  return (
    <>
      <MetadataHead
        title="DMH | Actividad"
        content="Ver actividad de la cuenta"
      />
      <MainBody>
        {permission && (
          <>
            <SectionWrapper bgcolor="grey.800" color="primary.contrastText">
              {!transaction ? (
                <Spinner />
              ) : (
                <>
                  <HeaderCardStack>
                    <StatusStack>
                      <CheckCircleOutlineIcon />
                      <Typography fontWeight={"bold"} fontSize={20}>
                        Aprobada
                      </Typography>
                    </StatusStack>
                    <DateTypography>
                      {`Creada el ${moment(transaction?.dated)
                        .locale("es")
                        .format("LL")} a las ${moment(transaction?.dated)
                        .locale("es")
                        .format("LT")}hs.`}
                    </DateTypography>
                  </HeaderCardStack>
                  <Divider color="#CECECE" />
                  <Stack sx={{ marginTop: "18px" }}>
                    <TypographySize16 fontWeight="700">
                      {transaction?.type === "Transfer"
                        ? "Transferencia de dinero"
                        : transaction?.type === "Deposit"
                        ? "Depósito de dinero"
                        : "Transacción"}
                    </TypographySize16>
                    <TypographySize20Green>
                      $ {transaction?.amount}
                    </TypographySize20Green>
                    {transaction?.type === "Transaction" &&
                      transaction?.description && (
                        <>
                          <TypographySize16>Descripción</TypographySize16>
                          <TypographySize24Green>
                            {transaction?.description}
                          </TypographySize24Green>
                        </>
                      )}
                    {transaction?.destination && (
                      <>
                        <TypographySize16>
                          {transaction?.type === "Transfer"
                            ? "Le transferiste a"
                            : "Para"}
                        </TypographySize16>
                        <TypographySize24Green>
                          {transaction?.destination}
                        </TypographySize24Green>
                      </>
                    )}
                    <TypographySize16>Número de operación</TypographySize16>
                    <TypographySize16 color="primary.main">
                      {transaction?.id}
                    </TypographySize16>
                  </Stack>
                </>
              )}
            </SectionWrapper>
            <ButtonsContainer>
              <ButtonActivityDetail
                variant="contained"
                sx={{ backgroundColor: "#CECECE" }}
                onClick={() => router.push("/home")}
              >
                Ir al inicio
              </ButtonActivityDetail>
              <ButtonActivityDetail
                variant="contained"
                onClick={() => {
                  generateTicket();
                }}
              >
                Descargar comprobante
              </ButtonActivityDetail>
            </ButtonsContainer>
          </>
        )}
      </MainBody>
    </>
  );
};

export default ActivityDetail;
