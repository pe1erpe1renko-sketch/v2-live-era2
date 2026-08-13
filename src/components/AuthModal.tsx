import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal, type AuthMode } from "@/context/AuthModalContext";

const FIELD =
  "auth-field h-12 w-full rounded-[6px] border border-rule bg-surface px-4 text-[14px] text-ink placeholder:text-ink3 outline-none transition-colors focus:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2";

function PrimaryButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-12 w-full rounded-[6px] text-[15px] transition-colors duration-200 ${FOCUS} ${
        disabled
          ? "cursor-not-allowed bg-rule text-ink3"
          : "bg-gold text-white hover:bg-[#6B5220]"
      }`}
    >
      {children}
    </button>
  );
}

function PasswordField({
  value,
  onChange,
  placeholder,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${FIELD} pr-11`}
      />
      <button
        type="button"
        aria-label={show ? "Скрыть пароль" : "Показать пароль"}
        onClick={() => setShow((v) => !v)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-[4px] text-ink3 ${FOCUS}`}
      >
        <Icon
          icon={show ? "solar:eye-closed-linear" : "solar:eye-linear"}
          className="h-[18px] w-[18px]"
        />
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative flex items-center">
      <span className="h-px w-full bg-rule" aria-hidden="true" />
      <span className="type-label absolute left-1/2 -translate-x-1/2 bg-surface px-3 text-ink3">
        или
      </span>
    </div>
  );
}

function SocialButtons({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex gap-3">
      {[
        { icon: "simple-icons:telegram", label: "Telegram", color: "#229ED9" },
        { icon: "solar:chat-square-linear", label: "MAX", color: undefined },
      ].map((b) => (
        <button
          key={b.label}
          type="button"
          /* ЗАГЛУШКА: вход через провайдера, заменить на реальную авторизацию */
          onClick={onDone}
          className={`flex h-12 w-1/2 items-center justify-center gap-2 rounded-[6px] border border-rule bg-surface text-[14px] text-ink transition-colors hover:border-gold2 ${FOCUS}`}
        >
          <Icon
            icon={b.icon}
            className={`h-[18px] w-[18px] ${b.color ? "" : "text-ink"}`}
            style={b.color ? { color: b.color } : undefined}
          />
          {b.label}
        </button>
      ))}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-rule transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold2 ${
          checked ? "border-gold bg-gold" : ""
        }`}
      >
        {checked ? <Icon icon="solar:check-read-linear" className="h-3 w-3 text-white" /> : null}
      </span>
      <span className="ml-[10px] text-[12px] leading-[1.45] text-ink2">{children}</span>
    </label>
  );
}

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`text-gold ${FOCUS}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}

export function AuthModal() {
  const { open, mode, isDark, close, setMode } = useAuthModal();
  const { setLoggedIn } = useAuth();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendIn, setResendIn] = useState(0);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  // Fade-in / scroll lock
  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(items).filter((el) => el.offsetParent !== null || el.tagName === "A");
      if (!list.length) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Focus first field
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open, mode]);

  // Smooth height between states
  useLayoutEffect(() => {
    if (!open || !bodyRef.current) return;
    const el = bodyRef.current;
    const update = () => setHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, mode]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const finishLogin = useCallback(() => {
    // ЗАГЛУШКА: здесь будет реальная авторизация
    setLoggedIn(true);
    close();
  }, [setLoggedIn, close]);

  const switchTo = (m: AuthMode) => setMode(m);

  const onCodeChange = (i: number, v: string) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) {
      setCode((c) => c.map((x, idx) => (idx === i ? "" : x)));
      return;
    }
    setCode((c) => {
      const next = [...c];
      digits.split("").forEach((d, k) => {
        if (i + k < 6) next[i + k] = d;
      });
      return next;
    });
    const target = Math.min(i + digits.length, 5);
    codeRefs.current[target]?.focus();
  };

  if (!mounted || !open) return null;

  const codeFilled = code.every((c) => c !== "");

  const content = (
    <div className={isDark ? "zone-dark" : undefined}>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />
        <div
          ref={panelRef}
          className={`relative w-full max-w-[420px] rounded-[16px] bg-surface p-8 shadow-panel transition-opacity duration-[250ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className={`absolute right-4 top-4 rounded-[6px] text-ink3 ${FOCUS}`}
          >
            <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
          </button>

          <div
            className="overflow-hidden transition-[height] duration-[250ms] ease-slow"
            style={{ height }}
          >
            <div ref={bodyRef}>
              {mode === "login" ? (
                <div>
                  <span className="type-label text-ink3">Вход</span>
                  <h2 className="mt-2 text-[26px] font-light leading-[1.15] tracking-[-0.03em] text-ink">
                    С возвращением
                  </h2>
                  <p className="mt-2 text-[14px] text-ink2">
                    Войдите через Telegram, MAX или почту.
                  </p>

                  <div className="mt-6">
                    <SocialButtons onDone={finishLogin} />
                  </div>
                  <div className="mt-5">
                    <Divider />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <input
                      ref={firstFieldRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите email"
                      className={FIELD}
                    />
                    <PasswordField
                      value={password}
                      onChange={setPassword}
                      placeholder="Введите пароль"
                    />
                  </div>

                  <div className="mt-2 text-right">
                    {/* ЗАГЛУШКА: восстановление пароля пока не реализовано */}
                    <button type="button" className={`text-[13px] text-gold ${FOCUS}`}>
                      Забыли пароль?
                    </button>
                  </div>

                  <div className="mt-6">
                    {/* ЗАГЛУШКА: вход без бэкенда */}
                    <PrimaryButton onClick={finishLogin}>Войти</PrimaryButton>
                  </div>

                  <p className="mt-4 text-center text-[13px] text-ink2">
                    Нет аккаунта?{" "}
                    <button
                      type="button"
                      onClick={() => switchTo("register")}
                      className={`text-gold ${FOCUS}`}
                    >
                      Зарегистрироваться
                    </button>
                  </p>
                </div>
              ) : null}

              {mode === "register" ? (
                <div>
                  <span className="type-label text-ink3">Регистрация</span>
                  <h2 className="mt-2 text-[26px] font-light leading-[1.15] tracking-[-0.03em] text-ink">
                    Ещё секунда — и видео начнёт создаваться
                  </h2>
                  <p className="mt-2 text-[14px] text-ink2">
                    Укажите почту и пароль, чтобы сохранить результат. На почту придёт код
                    подтверждения.
                  </p>

                  <div className="mt-6">
                    <SocialButtons onDone={finishLogin} />
                  </div>
                  <div className="mt-5">
                    <Divider />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <input
                      ref={firstFieldRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите имя"
                      className={FIELD}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите email"
                      className={FIELD}
                    />
                    <PasswordField
                      value={password}
                      onChange={setPassword}
                      placeholder="Придумайте пароль"
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <Checkbox checked={agree1} onChange={setAgree1}>
                      Я принимаю <DocLink href="/terms">Пользовательское соглашение</DocLink> и{" "}
                      <DocLink href="/privacy">Политику конфиденциальности</DocLink>
                    </Checkbox>
                    <Checkbox checked={agree2} onChange={setAgree2}>
                      Я даю <DocLink href="/consent">Согласие на обработку персональных данных</DocLink>
                    </Checkbox>
                  </div>

                  <div className="mt-6">
                    {/* ЗАГЛУШКА: регистрация без бэкенда — сразу шаг с кодом */}
                    <PrimaryButton
                      disabled={!agree1 || !agree2}
                      onClick={() => {
                        setResendIn(0);
                        switchTo("code");
                      }}
                    >
                      Зарегистрироваться
                    </PrimaryButton>
                  </div>

                  <p className="mt-4 text-center text-[13px] text-ink2">
                    Уже есть аккаунт?{" "}
                    <button
                      type="button"
                      onClick={() => switchTo("login")}
                      className={`text-gold ${FOCUS}`}
                    >
                      Войти
                    </button>
                  </p>
                </div>
              ) : null}

              {mode === "code" ? (
                <div>
                  <span className="type-label text-ink3">Шаг 2 · подтверждение</span>
                  <h2 className="mt-2 text-[26px] font-light leading-[1.15] tracking-[-0.03em] text-ink">
                    Проверьте почту
                  </h2>
                  <p className="mt-2 text-[14px] text-ink2">
                    Мы отправили код на <span className="text-ink">{email || "вашу почту"}</span>
                  </p>

                  <div className="mt-6 flex gap-2">
                    {code.map((c, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          codeRefs.current[i] = el;
                          if (i === 0) firstFieldRef.current = el;
                        }}
                        value={c}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onChange={(e) => onCodeChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !code[i] && i > 0) {
                            codeRefs.current[i - 1]?.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          onCodeChange(0, e.clipboardData.getData("text"));
                        }}
                        className="auth-field h-[56px] w-full max-w-[48px] flex-1 rounded-[6px] border border-rule bg-surface text-center text-[24px] font-light text-ink outline-none transition-colors focus:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 max-[360px]:h-12"
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    {/* ЗАГЛУШКА: подтверждение кода без бэкенда */}
                    <PrimaryButton disabled={!codeFilled} onClick={finishLogin}>
                      Подтвердить
                    </PrimaryButton>
                  </div>

                  <p className="mt-4 text-center text-[13px] text-ink2">
                    Не пришёл код?{" "}
                    {resendIn > 0 ? (
                      <span className="text-ink3">Отправить снова через {resendIn} с</span>
                    ) : (
                      <button
                        type="button"
                        /* ЗАГЛУШКА: повторная отправка кода */
                        onClick={() => setResendIn(60)}
                        className={`text-gold ${FOCUS}`}
                      >
                        Отправить снова
                      </button>
                    )}
                  </p>

                  <p className="mt-3 text-center">
                    <button
                      type="button"
                      onClick={() => switchTo("register")}
                      className={`text-[13px] text-ink3 ${FOCUS}`}
                    >
                      Изменить почту
                    </button>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
