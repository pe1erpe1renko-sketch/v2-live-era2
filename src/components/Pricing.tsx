import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

type Plan = {
  name: string;
  desc: string;
  price: string;
  label: string;
  cta: string;
  tokens: string;
  tokenNote: string;
  fill: string;
  clips: string;
  featured?: boolean;
  items: { text: string; sub?: string; note?: boolean }[];
};

const PLANS: Plan[] = [
  {
    name: "Старт",
    desc: "Попробовать и оживить пару снимков",
    price: "390",
    label: "От 16 ₽ за ролик",
    cta: "Выбрать «Старт»",
    tokens: "120",
    tokenNote: "сгорают в конце месяца",
    fill: "12%",
    clips: "≈ 24 ролика",
    items: [
      { text: "Все сценарии и быстрые нейросети" },
      { text: "Качество до 720p, ролики до 10 сек" },
      { text: "Оживление фото и видео по тексту" },
    ],
  },
  {
    name: "Про",
    desc: "Регулярно разбирать семейный архив",
    price: "990",
    label: "От 14 ₽ за ролик",
    cta: "Выбрать «Про»",
    tokens: "350",
    tokenNote: "остаток переносится",
    fill: "35%",
    clips: "≈ 70 роликов",
    featured: true,
    items: [
      { text: "Всё из «Старта», плюс:", note: true },
      { text: "Премиум-модели: Veo 3.1, Kling O3 Pro" },
      { text: "Ролики до 15 секунд" },
      { text: "Несколько снимков в одной сцене" },
      { text: "Приватные генерации" },
      { text: "Приоритетная очередь" },
    ],
  },
  {
    name: "Ультра",
    desc: "Для работы и потокового производства",
    price: "2 450",
    label: "От 12 ₽ за ролик",
    cta: "Выбрать «Ультра»",
    tokens: "1000",
    tokenNote: "остаток переносится",
    fill: "100%",
    clips: "≈ 200 роликов",
    items: [
      { text: "Всё из «Про», плюс:", note: true },
      { text: "Качество 4K" },
      { text: "Две генерации одновременно" },
    ],
  },
];

const ANY_PLAN = [
  "Первая генерация бесплатно, карта не нужна",
  "Без водяных знаков на любом тарифе",
  "Токены возвращаются, если генерация сорвалась",
  "Отмена подписки в один клик, без звонков",
  "Ролики приватны и не попадают в общую галерею",
  "Оплата российской картой, чек на почту",
];

function Feature({
  text,
  sub,
  dark,
  size = 13,
}: {
  text: string;
  sub?: string | undefined;
  dark?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-start">
      <Icon
        icon="solar:check-circle-linear"
        width={15}
        height={15}
        className="mt-[3px] shrink-0 text-gold2"
      />
      <span className="ml-[10px]">
        <span
          className={`block leading-[1.4] ${dark ? "text-[#FAFAFA]" : "text-ink2"}`}
          style={{ fontSize: size }}
        >
          {text}
        </span>
        {sub && <span className="mt-0.5 block text-[12px] leading-[1.4] text-ink3">{sub}</span>}
      </span>
    </div>
  );
}

export function Pricing() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Подписка</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Сколько роликов нужно вам в месяц
        </h2>

        <p className="type-body mt-4 max-w-[720px]">
          На тарифах «Про» и «Ультра» неиспользованные токены переходят на следующий месяц. Отменить
          можно в личном кабинете, без звонков и писем.
        </p>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          {PLANS.map((p) => {
            const dark = !!p.featured;
            return (
              <article
                key={p.name}
                tabIndex={0}
                className={`relative flex h-full flex-col rounded-[16px] p-7 shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  dark ? "bg-ink md:-my-6" : "border border-rule bg-surface"
                }`}
              >
                {dark && (
                  <span className="type-label absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] text-white">
                    Выбирают чаще
                  </span>
                )}

                <h3 className={`text-[18px] font-normal ${dark ? "text-[#FAFAFA]" : "text-ink"}`}>
                  {p.name}
                </h3>
                <p className={`mt-1.5 text-[13px] ${dark ? "text-ink3" : "text-ink2"}`}>{p.desc}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className={`text-[40px] font-light leading-none tracking-[-0.04em] ${
                      dark ? "text-gold2" : "text-gold"
                    }`}
                  >
                    {p.price}
                  </span>
                  <span className={`text-[14px] ${dark ? "text-ink3" : "text-ink3"}`}>₽/мес</span>
                </div>
                <div className={`type-label mt-1 ${dark ? "text-gold2" : "text-gold"}`}>
                  {p.label}
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <span className={`type-label ${dark ? "text-ink3" : "text-ink2"}`}>
                      Токенов в месяц
                    </span>
                    <span
                      className={`text-[20px] font-light leading-none ${
                        dark ? "text-gold2" : "text-gold"
                      }`}
                    >
                      {p.tokens}
                    </span>
                  </div>
                  <div
                    className={`mt-2.5 h-[6px] w-full overflow-hidden rounded-full ${
                      dark ? "bg-[#3F3F46]" : "bg-rule"
                    }`}
                  >
                    <div className="h-full rounded-full bg-gold2" style={{ width: p.fill }} />
                  </div>
                  <div className="type-label mt-2 text-ink3">{p.clips}</div>
                  <p className="mt-1 text-[12px] leading-[1.4] text-ink3">{p.tokenNote}</p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  {p.items.map((it) =>
                    it.note ? (
                      <p key={it.text} className="text-[12px] italic text-ink3">
                        {it.text}
                      </p>
                    ) : (
                      <Feature key={it.text} text={it.text} sub={it.sub} dark={dark} />
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full rounded-[6px] p-3 text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    dark
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "border border-rule text-ink hover:border-gold2 hover:text-gold"
                  }`}
                >
                  {p.cta}
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-[16px] border border-rule bg-surface p-5">
          <p className="type-label">В любом тарифе</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ANY_PLAN.map((t) => (
              <Feature key={t} text={t} size={12} />
            ))}
          </div>
        </div>

        <p className="mt-4 text-[13px] text-ink2">
          Нужен разовый платёж без подписки — есть пакеты токенов. Списание раз в месяц, напомним на
          почту за три дня до продления.
        </p>
      </div>
    </section>
  );
}
