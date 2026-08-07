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
      <rect x="4.5" y="12.5" width="8" height="15" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="20.5" y="12.5" width="0" height="0" />
      <rect x="33.5" y="12.5" width="0" height="0" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="4.5" y="12.5" width="8" height="15" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="4.5" y="12.5" width="8" height="15" />
      <rect x="33.5" y="12.5" width="0" height="0" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="4.5" y="12.5" width="8" height="15" />
      <rect x="33.5" y="12.5" width="0" height="0" />
      <rect x="20.5" y="12.5" width="0" height="0" />
      <rect x="15.5" y="12.5" width="15" height="15" />
      <rect x="4.5" y="12.5" width="8" height="15" />
      <rect x="33.5" y="12.5" width="0" height="0" />
      <rect x="15.5" y="12.5" width="15" height="15" />
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
      <path d="M20 8a12 12 0 0 1 10.39 6" strokeWidth="2.5" />
    </svg>
  );
}

const CELLS = [
  { label: "Формат", value: "MP4", note: "открывается везде, конвертировать не нужно", Icon: IconFormat },
  { label: "Длительность", value: "5–10 сек", note: "до 15 в прямом доступе", Icon: IconDuration },
  { label: "Кадр", value: "9:16 · 1:1 · 16:9", note: "под ленту, пост или экран", small: true, Icon: IconFrame },
  { label: "Разрешение", value: "720p", note: "до 4K на отдельных моделях", Icon: IconResolution },
  { label: "Ожидание", value: "1–3 мин", note: "зависит от модели и длины ролика", Icon: IconWait },
];

export function Specs() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>На выходе</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что вы получаете после генерации
        </h2>

        <div className="mt-12 overflow-hidden rounded-[16px] border border-rule bg-surface">
          <div className="grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {/* Главная ячейка */}
            <div className="relative overflow-hidden bg-gold3 p-6 sm:col-span-2 sm:border-b sm:border-rule lg:border-b">
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(176,141,87,0.25) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                  maskImage: "linear-gradient(to right, transparent, #000 70%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, #000 70%)",
                }}
              />
              <div className="relative">
                <div className="type-label">Водяной знак</div>
                <div className="mt-3 text-[56px] font-light leading-[1] text-gold">Нет</div>
                <p className="mt-2 text-[12px] leading-[1.4] text-ink2">
                  ни на одном тарифе, включая разовые пакеты
                </p>
              </div>
            </div>

            {CELLS.map((c, i) => (
              <div
                key={c.label}
                className={`group relative bg-surface p-6 transition-colors duration-[2000ms] ease-slow hover:bg-gold3 sm:border-rule ${
                  i % 2 === 0 ? "sm:border-l-0" : "sm:border-l"
                } ${i < 3 ? "sm:border-b" : ""} lg:border-l lg:border-rule ${
                  i < 2 ? "lg:border-b" : "lg:border-b-0"
                } ${i === 2 ? "lg:border-l-0" : ""}`}
              >
                <c.Icon className="absolute right-4 top-4 h-10 w-10 text-gold2 transition-colors duration-[2000ms] ease-slow group-hover:text-gold" />
                <div className="type-label">{c.label}</div>
                <div
                  className={`mt-3 pr-12 font-light leading-[1.1] text-ink ${c.small ? "text-[24px]" : "text-[32px]"}`}
                >
                  {c.value}
                </div>
                <p className="mt-2 text-[12px] leading-[1.4] text-ink3">{c.note}</p>
              </div>
            ))}

            {/* Ссылка */}
            <a
              href="#hero"
              className="flex items-center justify-center bg-surface p-6 text-[14px] text-gold transition-colors duration-[2000ms] ease-slow hover:bg-gold3 sm:border-l sm:border-rule lg:border-l"
            >
              Первая генерация бесплатно →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
