import React, { FC, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import User from "DMH/shared/layouts/Headers/User";
import {
  AppBarGrey,
  ButtonNavGrey,
  PaperDrawer,
} from "DMH/shared/styled/Header";
import { theme } from "DMH/styles/theme";
import { getAccount } from "DMH/services/account.service";
import { getUser } from "DMH/services/users.service";
import { IUserData } from "DMH/utils/types/user.types";
import { getAuthStorage } from "DMH/utils/auth";
import { AccountContext } from "DMH/context/account/AccountContext";
import { AuthContext } from "DMH/context/auth/AuthContext";

interface IProps {
  window?: () => Window;
}

const drawerWidth = 219;

const HeaderGrey: FC<IProps> = (props: IProps) => {
  const router = useRouter();
  const pathname: string = router.asPath;

  const [user, setUser] = useState<IUserData>();
  const { auth, logout } = useContext(AuthContext);
  const { account, setAccount, removeAccount } = useContext(AccountContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navItems = [
    { name: "Inicio", path: "/home" },
    { name: "Actividad", path: "/activity" },
    { name: "Tu perfil", path: "/profile" },
    { name: "Cargar dinero", path: "/add-money-methods" },
    { name: "Pagar servicios", path: "/pay-services" },
    { name: "Tarjetas", path: "/cards" },
    {
      name: "Cerrar sesión",
      path: "/",
      onclick: () => {
        removeAccount();
        logout();
      },
      color: "rgba(0, 0, 0, 0.5)",
    },
  ];

  const handleDrawerToggle = () => {
    auth && setMobileOpen(!mobileOpen);
  };

  const accountData = async () => {
    const data = await getAccount();
    !data.error && setAccount(data);
  };

  useEffect(
    () => {
      auth && accountData();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const token = getAuthStorage();
    account && token && getUser(account.user_id).then((data) => setUser(data));
  }, [account]);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        height: "inherit",
      }}
    >
      <PaperDrawer elevation={0}>
        <CloseRoundedIcon
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={handleDrawerToggle}
        />
        <Stack sx={{ padding: "20px 30px", textAlign: "start" }}>
          <Typography variant="h5">Hola,</Typography>
          <Typography variant="h5">
            {user && `${user?.firstname} ${user?.lastname}`}
          </Typography>
        </Stack>
      </PaperDrawer>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link
              href={{
                pathname: item.path,
              }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText
                  primary={item.name}
                  sx={{
                    textAlign: "left",
                    marginLeft: "16px",
                    color: item.color,
                    [`& span`]: {
                      fontSize: "17px",
                      fontWeight: pathname === item.path ? "800" : "600",
                    },
                  }}
                  onClick={item.onclick}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarGrey>
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Link href="/home" passHref>
            <div>
              <Image
                src="/dmh-logo-green.png"
                alt={"logo DMH"}
                width={86}
                height={33}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Link>
          {auth ? (
            <Stack direction={"row"} alignItems="center">
              <User />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mx: 1, display: { sm: "none" } }}
              >
                <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
              </IconButton>
            </Stack>
          ) : (
            <Box sx={{ display: { sm: "block" } }}>
              <ButtonNavGrey
                variant="outlined"
                href="/login"
                sx={{
                  marginX: "10px",
                }}
              >
                Ingresar
              </ButtonNavGrey>
              <ButtonNavGrey
                variant="contained"
                href="/register"
                sx={{
                  color: "black",
                }}
              >
                Crear cuenta
              </ButtonNavGrey>
            </Box>
          )}
        </Toolbar>
      </AppBarGrey>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default HeaderGrey;
