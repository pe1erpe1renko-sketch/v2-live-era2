import { useState } from "react";
import { Icon } from "@iconify/react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

const panel = "rounded-[16px] border border-rule bg-surface";

/** Контакты поддержки — заменяются здесь. */
export const SUPPORT_CONTACTS = {
  telegram: "@liveera_support",
  telegramUrl: "https://t.me/liveera_support",
  max: "Live Era2",
  maxUrl: "https://max.ru/liveera",
  email: "hello@liveera.ru",
};

/** Быстрые темы: позже подставят тему в письмо. */
const TOPICS = [
  "Не пришли токены",
  "Ошибка генерации",
  "Вопрос по оплате",
  "Удалить аккаунт",
  "Другое",
];

function CardShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SupportTab() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_CONTACTS.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SUPPORT_CONTACTS.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const cardCls = `${panel} block cursor-pointer p-5 transition-colors duration-200 hover:border-gold2 ${focusRing}`;

  return (
    <CardShell>
      <div>
        <h1 className="text-[24px] font-normal text-ink">Поддержка</h1>

        <div className={`${panel} mt-6 max-w-[720px] p-6`}>
          <p className="text-[14px] leading-[1.65] text-ink2">
            Напишите удобным способом — отвечаем в рабочее время, обычно в течение дня.
          </p>
          <p className="mt-3 text-[14px] leading-[1.65] text-ink2">
            Если не пришли токены или генерация завершилась ошибкой, сообщите номер операции:
            разберёмся вручную и вернём списанное.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href={SUPPORT_CONTACTS.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className={cardCls}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-[6px]"
              style={{ backgroundColor: "#2E2E31" }}
            >
              <Icon icon="simple-icons:telegram" width={20} height={20} color="#229ED9" />
            </span>
            <span className="mt-[14px] block text-[15px] text-ink">Telegram</span>
            <span className="mt-[6px] block text-[13px] text-ink2">
              {SUPPORT_CONTACTS.telegram}
            </span>
          </a>

          <a href={SUPPORT_CONTACTS.maxUrl} target="_blank" rel="noreferrer" className={cardCls}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-[6px]"
              style={{ backgroundColor: "#2E2E31" }}
            >
              <Icon
                icon="solar:chat-square-linear"
                width={20}
                height={20}
                color="var(--dark-ink, #FAFAFA)"
              />
            </span>
            <span className="mt-[14px] block text-[15px] text-ink">MAX</span>
            <span className="mt-[6px] block text-[13px] text-ink2">{SUPPORT_CONTACTS.max}</span>
          </a>

          <a href={`mailto:${SUPPORT_CONTACTS.email}`} className={cardCls}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-[6px]"
              style={{ backgroundColor: "#2E2E31" }}
            >
              <Icon
                icon="solar:letter-linear"
                width={20}
                height={20}
                color="var(--color-gold2)"
              />
            </span>
            <span className="mt-[14px] block text-[15px] text-ink">Почта</span>
            <span className="mt-[6px] flex flex-wrap items-center gap-2 text-[13px] text-ink2">
              {SUPPORT_CONTACTS.email}
              <button
                type="button"
                aria-label="Скопировать адрес"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void copyEmail();
                }}
                className={`cursor-pointer transition-colors duration-200 ${focusRing} ${
                  copied ? "" : "text-ink3 hover:text-gold2"
                }`}
                style={copied ? { color: "#4ADE80" } : undefined}
              >
                <Icon
                  icon={copied ? "solar:check-read-linear" : "solar:copy-linear"}
                  width={14}
                  height={14}
                />
              </button>
              {copied ? (
                <span className="text-[11px]" style={{ color: "#4ADE80" }}>
                  скопировано
                </span>
              ) : null}
            </span>
          </a>
        </div>


      </div>
    </CardShell>
  );
}
