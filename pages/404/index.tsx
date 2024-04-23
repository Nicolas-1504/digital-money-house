import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BodyCenter } from "DMH/shared/styled/BodyCenter";
import { theme } from "DMH/styles/theme";
import MetadataHead from "DMH/shared/items/MetadataHead";

const Error404: NextPage = () => {
  return (
    <>
      <MetadataHead
        title="DMH | Página no encontrada"
        content="404 - Page Not Found"
      />
      <BodyCenter
        sx={{
          color: "#FFF",
          fontSize: "1.5em",
          flexDirection: "row",
          gap: "30px",
          flexWrap: "wrap",
          alignContent: "center",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2em",
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>404 - Page Not Found</h1>
          <Link href="/">
            <a
              style={{
                textDecoration: "none",
                color: "#FFF",
                border: "1px solid #FFF",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              Volver al inicio
            </a>
          </Link>
        </div>
        <Image
          src="/404_img.png"
          alt={"404 - Page Not Found"}
          width={400}
          height={400}
        />
      </BodyCenter>
    </>
  );
};

export default Error404;
