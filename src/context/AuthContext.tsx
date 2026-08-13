import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AuthValue = {
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  toggle: () => void;
};

const AuthContext = createContext<AuthValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  toggle: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const value = useMemo(
    () => ({ isLoggedIn, setLoggedIn, toggle: () => setLoggedIn((v) => !v) }),
    [isLoggedIn],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
