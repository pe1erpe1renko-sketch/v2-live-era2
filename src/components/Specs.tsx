import type { ReactElement } from "react";
import { SectionLabel } from "@/components/SectionLabel";

type IconProps = { className?: string };

function IconFormat({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="4.5" y="9.5" width="31" height="21" rx="4" />
      <path d="M17 15.5 26 20l-9 4.5V15.5Z" />
    </svg>
  );
}

function IconDuration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4.5 26.5h31" />
      <path d="M11 26.5v-7M20 26.5v-10M29 26.5v-7" />
    </svg>
  );
}

function IconFrame({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="10" width="13.5" height="24" />
      <rect x="6" y="16" width="18" height="18" />
      <rect x="6" y="18.25" width="28" height="15.75" />
    </svg>
  );
}

function IconResolution({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="4.5" y="8.5" width="31" height="23" />
      <rect x="4.5" y="20.5" width="15" height="11" />
    </svg>
  );
}

function IconWait({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="12" />
      <path d="M20 8a12 12 0 0 1 10.39 6" />
    </svg>
  );
}

const CELLS: {
  label: string;
  value: string;
  note: string;
  small?: boolean;
  Icon?: (p: IconProps) => ReactElement;
}[] = [
  {
    label: "Водяной знак",
    value: "Без водяного знака",
    note: "ни на одном тарифе, включая разовые пакеты",
    small: true,
  },
  {
    label: "Формат",
    value: "MP4",
    note: "открывается везде, конвертировать не нужно",
    Icon: IconFormat,
  },
  {
    label: "Длительность",
    value: "5–10 сек",
    note: "до 15 в прямом доступе",
    Icon: IconDuration,
  },
  {
    label: "Кадр",
    value: "9:16 · 1:1 · 16:9",
    note: "под ленту, пост или экран",
    small: true,
    Icon: IconFrame,
  },
  {
    label: "Разрешение",
    value: "720p",
    note: "до 4K на отдельных моделях",
    Icon: IconResolution,
  },
];

export function Specs() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>На выходе</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что вы получаете после генерации
        </h2>

        <div className="mt-12 overflow-hidden rounded-[16px] border border-rule bg-rule">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {/* Главная ячейка — ожидание */}
            <div className="relative bg-gold3 p-6 sm:col-span-2">
              <IconWait className="absolute right-4 top-4 h-8 w-8 text-gold2" />
              <div className="type-label text-ink3">Минимальное ожидание</div>
              <div className="mt-3 whitespace-nowrap text-[40px] font-light leading-[1] text-gold">
                За 3 минуты
              </div>
              <p className="mt-2 text-[12px] leading-[1.4] text-ink3">
                от загрузки снимка до готового MP4, зависит от модели и длины ролика
              </p>
            </div>

            {CELLS.map((c) => (
              <div key={c.label} className="relative bg-surface p-6">
                {c.Icon ? <c.Icon className="absolute right-4 top-4 h-8 w-8 text-gold2" /> : null}
                <div className="type-label text-ink3">{c.label}</div>
                <div
                  className={`mt-3 whitespace-nowrap font-light leading-[1.1] text-ink ${
                    c.small ? "text-[24px]" : "text-[30px]"
                  }`}
                >
                  {c.value}
                </div>
                <p className="mt-2 text-[12px] leading-[1.4] text-ink3">{c.note}</p>
              </div>
            ))}

            {/* Ссылка */}
            <a
              href="#hero"
              className="flex items-center justify-center bg-surface p-6 text-[14px] text-gold transition-colors duration-200 ease-slow hover:bg-gold3"
            >
              Первая генерация бесплатно →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
