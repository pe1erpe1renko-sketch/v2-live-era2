import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { AppLink } from "@/components/AppLink";

export const ACCOUNT_LINKS = [
  { icon: "solar:gallery-linear", label: "Мои генерации", href: "/account?tab=generations" },
  { icon: "solar:settings-linear", label: "Настройки профиля", href: "/account?tab=profile" },
  { icon: "solar:chat-round-line-linear", label: "Поддержка", href: "/account?tab=support" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

export function TokenPill() {
  return (
    <span className="hidden items-center rounded-full border border-rule px-[14px] py-[6px] lg:inline-flex">
      <span className="h-[6px] w-[6px] rounded-full bg-gold2" aria-hidden="true" />
      <span className="ml-2 text-[13px] text-ink">0 ток.</span>
    </span>
  );
}

export function AccountMenu() {
  const { setLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative ml-4">
      <button
        ref={btnRef}
        type="button"
        aria-label="Меню аккаунта"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-gold3 text-[15px] font-normal text-gold ${focusRing}`}
      >
        П
      </button>

      {open ? (
        <div className="animate-mega absolute right-0 top-full mt-2 w-[280px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[16px] border border-rule bg-surface shadow-panel">
          <div className="flex items-center p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold3 text-[15px] text-gold">
              П
            </span>
            <span className="ml-3 min-w-0">
              <span className="block truncate text-[14px] text-ink">Пользователь</span>
              <span className="block truncate text-[12px] text-ink3">user@example.com</span>
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-rule p-4">
            <span className="flex items-center">
              <span className="h-[6px] w-[6px] rounded-full bg-gold2" aria-hidden="true" />
              <span className="ml-2 text-[14px] text-ink">0 токенов</span>
            </span>
            <AppLink
              href="/account?tab=balance"
              onClick={() => setOpen(false)}
              className={`rounded-[6px] bg-gold px-[14px] py-[6px] text-[12px] text-white transition-colors duration-200 hover:bg-gold-dark ${focusRing}`}
            >
              Пополнить
            </AppLink>
          </div>

          <div className="border-t border-rule p-2">
            {ACCOUNT_LINKS.map((l) => (
              <AppLink
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center rounded-[6px] px-4 py-3 transition-colors duration-200 hover:bg-gold3 ${focusRing}`}
              >
                <Icon icon={l.icon} className="h-[18px] w-[18px] shrink-0 text-ink3" />
                <span className="ml-3 text-[14px] text-ink">{l.label}</span>
              </AppLink>
            ))}
          </div>

          <div className="border-t border-rule p-2">
            <button
              type="button"
              onClick={() => {
                setLoggedIn(false);
                setOpen(false);
              }}
              className={`flex w-full items-center rounded-[6px] px-4 py-3 text-left transition-colors duration-200 hover:bg-gold3 ${focusRing}`}
            >
              <Icon icon="solar:logout-2-linear" className="h-[18px] w-[18px] shrink-0 text-ink3" />
              <span className="ml-3 text-[14px] text-ink2">Выйти</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
