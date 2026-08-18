import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

// TODO backend: признак freeGenerationUsed хранится на сервере, проверка права
// выполняется на сервере при каждом запросе генерации. Фронт только отображает состояние.

type AuthValue = {
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  toggle: () => void;
  /** баланс токенов аккаунта */
  tokenBalance: number;
  /** первая бесплатная генерация уже израсходована — сбросу не подлежит */
  freeGenerationUsed: boolean;
  markFreeGenerationUsed: () => void;
};

const AuthContext = createContext<AuthValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  toggle: () => {},
  tokenBalance: 0,
  freeGenerationUsed: false,
  markFreeGenerationUsed: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [tokenBalance] = useState(0);
  const [freeGenerationUsed, setFreeGenerationUsed] = useState(false);

  const markFreeGenerationUsed = useCallback(() => setFreeGenerationUsed(true), []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setLoggedIn,
      toggle: () => setLoggedIn((v) => !v),
      tokenBalance,
      freeGenerationUsed,
      markFreeGenerationUsed,
    }),
    [isLoggedIn, tokenBalance, freeGenerationUsed, markFreeGenerationUsed],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
