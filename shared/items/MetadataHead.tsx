import React, { FC } from "react";
import Head from "next/head";

interface IMetadataProps {
  title: string;
  content: string;
}

const MetadataHead: FC<IMetadataProps> = ({ title, content }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default MetadataHead;
