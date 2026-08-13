import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";
import { SectionLabel } from "@/components/SectionLabel";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

const ALL_DOCS = [
  { href: "/offer", label: "Оферта" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/terms", label: "Пользовательское соглашение" },
  { href: "/consent", label: "Согласие на обработку данных" },
];

/* ── Типографика документа ─────────────────────────────────────── */

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-[14px] text-[15px] leading-[1.75] text-ink2 first:mt-0">{children}</p>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-[10px] text-[16px] font-normal text-ink">{children}</h3>;
}

export function OL({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-[14px] list-decimal space-y-[10px] pl-6 text-[15px] leading-[1.75] text-ink2 marker:text-ink3">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ol>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-[14px] space-y-[10px] pl-6 text-[15px] leading-[1.75] text-ink2">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-4 top-[11px] block h-[4px] w-[4px] rounded-full bg-gold2" />
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-[14px] rounded-[6px] border-l-[3px] border-gold2 bg-gold3 px-5 py-4 text-[14px] leading-[1.6] text-ink">
      {children}
    </div>
  );
}

export function Term({ children }: { children: ReactNode }) {
  return <span className="font-medium text-ink">{children}</span>;
}

/* ── Шаблон страницы ───────────────────────────────────────────── */

export function LegalDoc({
  title,
  sections,
  currentHref,
}: {
  title: string;
  sections: LegalSection[];
  currentHref: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    setTocOpen(false);
  };

  const others = ALL_DOCS.filter((d) => d.href !== currentHref);

  const tocList = (
    <ul className="space-y-[10px]">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => goTo(s.id)}
              className={`block w-full border-l-2 pl-3 text-left text-[13px] leading-[1.4] transition-colors duration-200 ease-slow focus-visible:outline-2 focus-visible:outline-gold2 ${
                isActive
                  ? "border-gold text-ink"
                  : "border-rule text-ink2 hover:border-gold2 hover:text-ink"
              }`}
            >
              {s.title}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="legal-page px-6 pb-24 sm:px-8">
      <div className="mx-auto max-w-[1100px] pt-16">
        <SectionLabel>Документ</SectionLabel>
        <h1 className="mt-4 text-[clamp(28px,3.4vw,42px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          {title}
        </h1>
        {/* Даты — подстановки, заменить на реальные при публикации */}
        <p className="mt-3 text-[13px] text-ink3">Редакция от [дата] · Действует с [дата]</p>
        <div className="mt-6 border-b border-rule" />
      </div>

      <div className="mx-auto mt-8 grid max-w-[1100px] gap-12 lg:grid-cols-[240px_1fr]">
        {/* Содержание */}
        <aside className="legal-toc">
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setTocOpen((v) => !v)}
              aria-expanded={tocOpen}
              className="flex w-full items-center justify-between rounded-[6px] border border-rule bg-surface px-4 py-3 text-[13px] text-ink focus-visible:outline-2 focus-visible:outline-gold2"
            >
              Содержание
              <Icon
                icon="solar:alt-arrow-down-linear"
                width={16}
                className={`transition-transform duration-200 ease-slow ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            {tocOpen && <div className="mt-4">{tocList}</div>}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-[96px]">
            <p className="type-label">Содержание</p>
            <nav className="mt-4">{tocList}</nav>
            <div className="mt-6 border-t border-rule pt-4">
              {/* Скачивание PDF пока не подключено */}
              <button
                type="button"
                className="inline-flex items-center gap-2 text-[13px] text-gold focus-visible:outline-2 focus-visible:outline-gold2"
              >
                <Icon icon="solar:download-minimalistic-linear" width={14} height={14} />
                Скачать PDF
              </button>
            </div>
          </div>
        </aside>

        {/* Текст документа */}
        <div className="max-w-[720px]">
          {/* Временный блок — удалить после публикации финальных текстов */}
          <Callout>
            Это предварительная редакция документа. Окончательный текст будет опубликован до запуска
            сервиса.
          </Callout>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-[90px]">
              <div className="mt-10">
                <p className="type-label mb-[6px] text-gold2">
                  Раздел {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mb-[14px] text-[20px] font-normal leading-[1.3] text-ink">
                  {s.title}
                </h2>
              </div>
              {s.content}
            </section>
          ))}

          <div className="mt-12 border-t border-rule pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-ink2">
                Вопросы по документам —{" "}
                <a
                  href="mailto:hello@liveera.ru"
                  className="text-gold hover:underline focus-visible:outline-2 focus-visible:outline-gold2"
                >
                  hello@liveera.ru
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink2">
                {others.map((d, i) => (
                  <span key={d.href} className="flex items-center gap-2">
                    {i > 0 && <span className="text-ink3">·</span>}
                    <AppLink
                      href={d.href}
                      className="hover:text-ink focus-visible:outline-2 focus-visible:outline-gold2"
                    >
                      {d.label}
                    </AppLink>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
