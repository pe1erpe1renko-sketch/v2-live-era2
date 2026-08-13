import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { LightLayout } from "@/components/layouts/LightLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { AppLink } from "@/components/AppLink";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Live Era2" },
      {
        name: "description",
        content:
          "Как связаться с Live Era2: Telegram, MAX и почта поддержки, реквизиты и документы сервиса.",
      },
      { property: "og:title", content: "Контакты — Live Era2" },
      {
        property: "og:description",
        content: "Telegram, MAX и почта поддержки Live Era2, реквизиты и документы.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

/* Контакты — меняются в одном месте */
const CONTACTS = {
  telegram: { value: "@liveera_support", href: "https://t.me/liveera_support" },
  max: { value: "Live Era2", href: "https://max.ru/liveera" },
  email: "hello@liveera.ru",
};

/* Реквизиты — значения в скобках подставляются позже */
const REQUISITES: { label: string; value: string }[] = [
  { label: "Продавец", value: "Индивидуальный предприниматель [ФИО]" },
  { label: "ИНН", value: "[номер]" },
  { label: "ОГРНИП", value: "[номер]" },
  { label: "Адрес", value: "[адрес]" },
  { label: "Почта", value: CONTACTS.email },
];

const DOCS = [
  { label: "Оферта", href: "/offer" },
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Согласие на обработку данных", href: "/consent" },
];

const cardClass =
  "rounded-[16px] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2";

function IconBox({ icon, color }: { icon: string; color: string }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-gold3">
      <Icon icon={icon} width={22} height={22} style={{ color }} />
    </span>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTS.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTACTS.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cardClass}>
      <IconBox icon="solar:letter-linear" color="var(--color-gold)" />
      <p className="mt-4 text-[16px] text-ink">Почта</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${CONTACTS.email}`}
          className="text-[14px] text-ink2 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          {CONTACTS.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Скопировать адрес почты"
          className="flex items-center gap-1 text-[12px] text-ink3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          <Icon
            icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"}
            width={14}
            height={14}
            className={copied ? "text-gold" : ""}
          />
          {copied && <span className="text-gold">скопировано</span>}
        </button>
      </div>
    </div>
  );
}

function Page() {
  return (
    <LightLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 lg:px-16">
        <SectionLabel>Контакты</SectionLabel>
        <h1 className="mt-4 text-[clamp(32px,4vw,52px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Связаться с нами
        </h1>
        <p className="mt-3 max-w-[640px] text-[15px] leading-[1.6] text-ink2">
          Отвечаем в рабочее время, обычно в течение дня. По вопросам оплаты и сбоям генерации —
          сразу пишите, разберёмся вручную.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <a href={CONTACTS.telegram.href} target="_blank" rel="noreferrer" className={cardClass}>
            <IconBox icon="simple-icons:telegram" color="#229ED9" />
            <p className="mt-4 text-[16px] text-ink">Telegram</p>
            <p className="mt-1.5 text-[14px] text-ink2">{CONTACTS.telegram.value}</p>
          </a>

          <a href={CONTACTS.max.href} target="_blank" rel="noreferrer" className={cardClass}>
            <IconBox icon="solar:chat-square-linear" color="var(--color-gold)" />
            <p className="mt-4 text-[16px] text-ink">MAX</p>
            <p className="mt-1.5 text-[14px] text-ink2">{CONTACTS.max.value}</p>
          </a>

          <EmailCard />
        </div>

        <div className="mt-6 max-w-[640px] rounded-[16px] border border-rule bg-surface p-6">
          <p className="type-label text-ink3">Реквизиты</p>
          <div className="mt-4">
            {REQUISITES.map((r) => (
              <div key={r.label} className="mt-2.5 flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-[140px] shrink-0 text-[13px] text-ink3">{r.label}</span>
                <span className="text-[14px] text-ink">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 max-w-[640px] rounded-[16px] border border-rule bg-surface p-6">
          <p className="type-label text-ink3">Документы</p>
          <div className="mt-4 flex flex-col">
            {DOCS.map((d) => (
              <AppLink
                key={d.href}
                href={d.href}
                className="mt-2.5 flex items-center gap-2 text-[14px] text-gold transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
              >
                <Icon icon="solar:document-text-linear" width={16} height={16} />
                {d.label}
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </LightLayout>
  );
}
