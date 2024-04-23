import { createContext, useEffect, useState } from "react";
import { FC, PropsWithChildren } from "react";
import {
  setAuthStorage,
  getAuthStorage,
  removeAuthStorage,
} from "DMH/utils/auth";

interface IAuth {
  auth: string | null;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({
  auth: "",
  authenticate: (token) => {},
  logout: () => {},
});

const { Provider } = AuthContext;

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = getAuthStorage();
    if (storedAuth) {
      setAuth(storedAuth);
    } else {
      setAuth(null);
    }
  }, [setAuth]);

  const authenticate = (token: string) => {
    setAuth(token);
    setAuthStorage(token);
  };

  const logout = () => {
    setAuth(null);
    removeAuthStorage();
  };

  return <Provider value={{ auth, authenticate, logout }}>{children}</Provider>;
};
