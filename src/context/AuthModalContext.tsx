import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type AuthMode = "login" | "register" | "code";

type AuthModalValue = {
  open: boolean;
  mode: AuthMode;
  isDark: boolean;
  openAuth: (mode?: AuthMode) => void;
  close: () => void;
  setMode: (m: AuthMode) => void;
  setDark: (v: boolean) => void;
};

const AuthModalContext = createContext<AuthModalValue>({
  open: false,
  mode: "login",
  isDark: false,
  openAuth: () => {},
  close: () => {},
  setMode: () => {},
  setDark: () => {},
});

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [isDark, setDark] = useState(false);

  const openAuth = useCallback((m: AuthMode = "login") => {
    setMode(m);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, mode, isDark, openAuth, close, setMode, setDark }),
    [open, mode, isDark, openAuth, close],
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  return useContext(AuthModalContext);
}
