import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, Stack, Typography } from "@mui/material";
import { getUser } from "DMH/services/users.service";
import { IUserData } from "DMH/utils/types/user.types";
import { getAccountStorage } from "DMH/utils/account";

const User: FC = () => {
  const [user, setUser] = useState<IUserData>();

  useEffect(() => {
    const account = getAccountStorage();
    account && !user &&
    getUser(account?.user_id).then((data) => setUser(data));
  });

  return (
    <>
      {user && (
        <Link href="/home" passHref>
          <Stack direction={"row"} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "primary.main",
                color: "grey.800",
                fontWeight: "600",
              }}
              variant="rounded"
            >
              {`${user?.firstname?.charAt(0)}${user?.lastname?.charAt(0)}`}
            </Avatar>
            <Typography
              sx={{
                margin: "10px",
                color: "white",
                fontWeight: "700",
                display: { xs: "none", sm: "block" },
                cursor: "pointer"
              }}
            >
              {`Hola, ${user?.firstname} ${user?.lastname}`}
            </Typography>
          </Stack>
        </Link>
      )}
    </>
  );
};
export default User;
