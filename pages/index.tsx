import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PaperBackgroundStyled } from "DMH/components/landing/PaperBackgroundStyled";
import { Box, Stack } from "@mui/material";
import { getAuthStorage } from "DMH/utils/auth";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";
import { connectToDatabase } from "DMH/utils/mongodb";
import Head from "next/head";
import { GreenBoxStyled } from "DMH/components/landing/GreenBoxStyled";
import SquareBox, { TSquare } from "DMH/components/landing/SquareBox";
import Slogan from "DMH/components/landing/Slogan";
import MetadataHead from "DMH/shared/items/MetadataHead";

export type LandingProps = {
  wordings: [
    {
      images: {
        mobile: string;
        desktop: string;
      };
      mainInfo: {
        green: { normal: string; strong: string };
        white: string;
      };
      squares: TSquare[];
    }
  ];
};

const Landing: NextPage<LandingProps> = ({ wordings }) => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const { images, mainInfo, squares } = wordings[0];

  useEffect(
    () => {
      const token = getAuthStorage();
      !token && setPermission(true);
      token && router.push("/home");
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <MetadataHead
        title="Digital Money House"
        content="Tu billetera virtual para transferir dinero y pagar servicios."
      />
      {permission && (
        <PaperBackgroundStyled
          sx={{
            backgroundImage: `url(${images.mobile})`,
            "@media (min-width: 600px)": {
              backgroundImage: `url(${images.desktop})`,
            },
          }}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%", minHeight: "calc(100vh - 128px)" }}
          >
            <Slogan
              whitePhrase={mainInfo.white}
              greenNormalPhrase={mainInfo.green.normal}
              greenStrongPhrase={mainInfo.green.strong}
            />
            <Box sx={{ position: "relative" }}>
              <Grid
                container
                sx={{ marginBottom: "24px", gap: "16px" }}
                display="flex"
                justifyContent="center"
              >
                {squares.map((sq: TSquare, index: number) => {
                  return (
                    <Grid
                      md={12}
                      lg={4}
                      xl={3}
                      key={index}
                      display="flex"
                      justifyContent="center"
                    >
                      <SquareBox
                        title={sq.title}
                        description={sq.description}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <GreenBoxStyled />
            </Box>
          </Stack>
        </PaperBackgroundStyled>
      )}
    </>
  );
};

export default Landing;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("wordings").find({}).toArray();

    const wordings: object = JSON.parse(JSON.stringify(data));

    return {
      props: {
        isConnected: true,
        wordings,
      },
    };
  } catch (e) {
    return {
      props: {
        isConnected: false,
        wordings: [],
      },
    };
  }
};
