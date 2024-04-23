import React, { FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { theme } from "DMH/styles/theme";
import { AuthContext } from "DMH/context/auth/AuthContext";
import { AccountContext } from "DMH/context/account/AccountContext";
import usePayServices from "DMH/context/payServices/usePayServices";

const drawerWidth = 240;

const Sidebar: FC = () => {
  const router = useRouter();
  const pathname: string = router.asPath;

  const { logout } = useContext(AuthContext);
  const { removeAccount } = useContext(AccountContext);
  const { dispatch } = usePayServices();

  const menuItems = [
    { name: "Inicio", path: "/home" },
    { name: "Actividad", path: "/activity" },
    { name: "Tu perfil", path: "/profile" },
    { name: "Cargar dinero", path: "/add-money-methods" },
    {
      name: "Pagar servicios",
      path: "/pay-services",
      onclick: () => {
        dispatch({ type: "SET_DEFAULT" });
      },
    },
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: theme.palette.primary.main,
          border: "none",
          [theme.breakpoints.down("sm")]: {
            display: "none",
            width: "0px",
          },
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ marginTop: "30px" }}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <Link
                href={{
                  pathname: item.path,
                }}
              >
                <ListItemButton>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      paddingLeft: "25px",
                      color: item.color,
                      [`& span`]: {
                        fontSize: "17px",
                        fontWeight: pathname.includes(item.path)
                          ? "800"
                          : "600",
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
    </Drawer>
  );
};

export default Sidebar;
