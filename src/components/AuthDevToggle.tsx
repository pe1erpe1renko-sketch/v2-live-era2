import { useAuth } from "@/context/AuthContext";

/**
 * ВРЕМЕННЫЙ КОМПОНЕНТ.
 * Переключатель состояния авторизации для проверки вёрстки.
 * Удалить после подключения реальной авторизации.
 */
export function AuthDevToggle() {
  const { isLoggedIn, toggle } = useAuth();
  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-[9999] rounded-full bg-ink px-[14px] py-2 text-[11px] text-white opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
    >
      {isLoggedIn ? "Вошёл" : "Не вошёл"}
    </button>
  );
}
