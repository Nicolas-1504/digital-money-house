import { Grid, Typography } from "@mui/material";
import React, { ReactElement } from "react";

export type SingleDataProps = {
  title: string;
  content: string | number;
  icon?: ReactElement;
  edit: boolean;
  input?: ReactElement;
};

const SingleData = ({ title, content, icon, edit, input }: SingleDataProps) => {
  return (
    <Grid
      container
      sx={{
        borderBottom: "1px solid #CECECE",
        padding: "10px 0",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={11} md={8} lg={8} xl={8}>
        {edit && input ? input : <Typography color={"#CECECE"}>{content}</Typography>}
      </Grid>
      <Grid
        item
        xs={1}
        md={1}
        lg={1}
        xl={1}
        justifyContent={"flex-end"}
        display={"flex"}
      >
        {!edit && icon}
      </Grid>
    </Grid>
  );
};

export default SingleData;
