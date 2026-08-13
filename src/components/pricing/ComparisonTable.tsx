import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

type Cell = string | "yes" | "no";

const ROWS: { label: string; v: [Cell, Cell, Cell] }[] = [
  { label: "Цена в месяц", v: ["490 ₽", "990 ₽", "2 450 ₽"] },
  { label: "Токенов в месяц", v: ["115", "260", "760"] },
  { label: "Роликов по 5 секунд", v: ["≈ 9", "≈ 21", "≈ 63"] },
  { label: "Цена за ролик", v: ["от 54 ₽", "от 47 ₽", "от 39 ₽"] },
  { label: "Остаток переносится", v: ["no", "yes", "yes"] },
  { label: "Длина ролика", v: ["до 10 сек", "до 15 сек", "до 15 сек"] },
  { label: "Качество", v: ["720p", "1080p", "4K"] },
  { label: "Быстрые модели", v: ["yes", "yes", "yes"] },
  { label: "Премиум-модели", v: ["no", "yes", "yes"] },
  { label: "Несколько снимков в сцене", v: ["no", "yes", "yes"] },
  { label: "Приватные генерации", v: ["no", "yes", "yes"] },
  { label: "Приоритетная очередь", v: ["no", "yes", "yes"] },
  { label: "Генераций одновременно", v: ["1", "1", "2"] },
  { label: "Без водяных знаков", v: ["yes", "yes", "yes"] },
  { label: "Возврат токенов при сбое", v: ["yes", "yes", "yes"] },
];

function Value({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <Icon
        icon="solar:check-circle-linear"
        width={18}
        height={18}
        className="mx-auto text-gold2"
        aria-label="есть"
      />
    );
  if (v === "no")
    return (
      <Icon
        icon="solar:minus-circle-linear"
        width={18}
        height={18}
        className="mx-auto text-ink3"
        aria-label="нет"
      />
    );
  return <span className="text-[13px] text-ink">{v}</span>;
}

export function ComparisonTable() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-8 pt-16 lg:px-16">
        <SectionLabel>Сравнение</SectionLabel>

        <h2 className="mt-4 text-[clamp(26px,3vw,38px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что входит в каждый тариф
        </h2>

        <div
          tabIndex={0}
          className="mt-8 overflow-x-auto rounded-[16px] border border-rule bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:rounded-[16px]"
        >
          <table className="w-full border-collapse text-left md:min-w-[640px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-[130px] bg-surface px-5 py-[14px] shadow-[4px_0_8px_rgba(0,0,0,0.06)] md:w-[40%] md:shadow-none md:py-[14px]" />
                <th className="min-w-[90px] px-5 py-[14px] text-center text-[15px] font-normal text-ink md:py-[14px]">
                  Старт
                </th>
                <th className="min-w-[90px] bg-gold3 px-5 py-[14px] text-center text-[15px] font-normal text-ink md:py-[14px]">
                  Про
                  <span className="type-label mt-0.5 block text-[10px] text-gold">Популярный</span>
                </th>
                <th className="min-w-[90px] px-5 py-[14px] text-center text-[15px] font-normal text-ink md:py-[14px]">
                  Ультра
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-t border-rule">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-[130px] border-r border-rule bg-surface px-[10px] py-[10px] text-left text-[12px] font-normal leading-[1.3] text-ink2 shadow-[4px_0_8px_rgba(0,0,0,0.06)] md:w-[40%] md:border-r-0 md:px-5 md:py-[14px] md:text-[13px] md:shadow-none"
                  >
                    {r.label}
                  </th>
                  <td className="min-w-[90px] px-[8px] py-[10px] text-center text-[12px] md:px-5 md:py-[14px] md:text-[13px]">
                    <Value v={r.v[0]} />
                  </td>
                  <td className="min-w-[90px] bg-gold3 px-[8px] py-[10px] text-center text-[12px] md:px-5 md:py-[14px] md:text-[13px]">
                    <Value v={r.v[1]} />
                  </td>
                  <td className="min-w-[90px] px-[8px] py-[10px] text-center text-[12px] md:px-5 md:py-[14px] md:text-[13px]">
                    <Value v={r.v[2]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
