import { Grid, Snackbar, Typography } from "@mui/material";
import { getUser, updateUser } from "DMH/services/users.service";
import { PrimaryButton } from "DMH/shared/styled/Buttons";
import { PencilIconStyle } from "DMH/shared/styled/ProfileComponents";
import SectionWrapper from "DMH/shared/wrappers/SectionWrapper";
import { getAccountStorage } from "DMH/utils/account";
import { IUserData, IValidationUserData } from "DMH/utils/types/user.types";
import React, { useEffect, useState } from "react";
import SingleData from "./SingleData";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "DMH/utils/schemas/userSchema";
import ControlledTextInput from "DMH/shared/form/ControlledTextInput";
import Spinner from "DMH/shared/items/Spinner";
import { FormError } from "DMH/shared/styled/FormError";
import { theme } from "DMH/styles/theme";

const ProfileData = () => {
  const [data, setData] = useState<IUserData>();
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const form = useForm<IValidationUserData>({
    resolver: yupResolver(userSchema),
  });
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = form;

  const onSubmit = (dataUser: IValidationUserData) => {
    setLoading(true);
    const { user_id } = getAccountStorage();
    const body = {
      ...dataUser,
      dni: 0,
      email: "",
      firstname: dataUser?.name.split(" ").slice(0, -1).join(" "),
      lastname: dataUser?.name.split(" ").slice(-1).join(" "),
    };
    updateUser(body, user_id)
      .then((res) => {
        res?.id
          ? getUser(user_id).then((data) => {
              setData(data);
              setOpen(true);
              setEdit(false);
            })
          : setError(res?.error);
      })
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        phone: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    if (data) {
      setValue("name", `${data?.firstname} ${data?.lastname}`);
      setValue("phone", data?.phone);
    }
  }, [data, setValue, edit]);

  useEffect(() => {
    const { user_id } = getAccountStorage();
    getUser(user_id).then((data) => setData(data));
  }, []);

  return (
    <SectionWrapper bgcolor="primary.contrastText" color="grey.800">
      <>
        <Typography
          fontSize={20}
          fontWeight={"bold"}
          sx={{
            borderBottom: "1px solid #CECECE",
            paddingBottom: "10px",
            [theme.breakpoints.up("sm")]: {
              borderBottom: "none",
              paddingBottom: "0",
            },
          }}
        >
          Tus datos
        </Typography>
        {data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...form}>
              <SingleData title={"Email"} content={data?.email} edit={edit} />
              <SingleData
                title={"Nombre y apellido"}
                content={`${data?.firstname} ${data?.lastname}`}
                icon={<PencilIconStyle onClick={() => setEdit(true)} />}
                edit={edit}
                input={
                  <ControlledTextInput
                    name="name"
                    placeholder="Nombre y apellido*"
                  />
                }
              />
              <SingleData title={"CUIT"} content={data?.dni} edit={edit} />
              <SingleData
                title={"Teléfono"}
                content={data?.phone}
                icon={<PencilIconStyle onClick={() => setEdit(true)} />}
                edit={edit}
                input={
                  <ControlledTextInput name="phone" placeholder="Teléfono*" />
                }
              />
              <SingleData
                title={"Contraseña"}
                content={"******"}
                icon={<PencilIconStyle onClick={() => setEdit(true)} />}
                edit={edit}
                input={
                  <ControlledTextInput
                    name="password"
                    placeholder="Contraseña*"
                    passwordAdornment
                  />
                }
              />
              {edit && (
                <Grid container columnSpacing={3}>
                  <Grid item xs={0} md={8} lg={8} xl={10}></Grid>
                  <Grid item xs={12} md={2} lg={2} xl={1} marginTop={2}>
                    <PrimaryButton
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        setEdit(false);
                        reset({
                          name: "",
                          phone: "",
                          password: "",
                        });
                      }}
                    >
                      Cancelar
                    </PrimaryButton>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2} xl={1} marginTop={2}>
                    <PrimaryButton
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {loading ? <Spinner /> : "Guardar"}
                    </PrimaryButton>
                  </Grid>
                  <Grid item xs={0} md={8} lg={8} xl={10}></Grid>
                  <Grid item xs={12} md={4} lg={4} xl={2} marginTop={2}>
                    {error && <FormError>{error}</FormError>}
                  </Grid>
                </Grid>
              )}
            </FormProvider>
          </form>
        )}
        <Snackbar
          sx={{
            marginBottom: 8,
            [`& .MuiPaper-root`]: { display: "flex", justifyContent: "center" },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={1000}
          message="¡Tus datos han sido actualizados!"
        />
      </>
    </SectionWrapper>
  );
};

export default ProfileData;
