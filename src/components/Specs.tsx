import { SectionLabel } from "@/components/SectionLabel";

const CELLS = [
  { label: "Водяной знак", value: "Нет", note: "ни на одном тарифе, включая разовые пакеты" },
  { label: "Формат", value: "MP4", note: "открывается везде, конвертировать не нужно" },
  { label: "Длительность", value: "5–10 сек", note: "до 15 в прямом доступе" },
  { label: "Кадр", value: "9:16 · 1:1 · 16:9", note: "под ленту, пост или экран", small: true },
  { label: "Разрешение", value: "720p", note: "до 4K на отдельных моделях" },
  { label: "Ожидание", value: "1–3 мин", note: "зависит от модели и длины ролика" },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CELLS.map((c, i) => (
              <div
                key={c.label}
                className={`p-6 ${i % 1 === 0 ? "" : ""} border-rule
                  ${i > 0 ? "border-t sm:border-t" : ""}
                  ${i % 2 === 1 ? "sm:border-l" : ""}
                  ${i >= 2 ? "sm:border-t" : "sm:border-t-0"}
                  lg:border-t-0 ${i % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"} ${i >= 3 ? "lg:border-t" : ""}`}
              >
                <div className="type-label">{c.label}</div>
                <div
                  className={`mt-3 font-light leading-[1.1] text-ink ${c.small ? "text-[24px]" : "text-[32px]"}`}
                >
                  {c.value}
                </div>
                <p className="mt-2 text-[12px] leading-[1.4] text-ink3">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
