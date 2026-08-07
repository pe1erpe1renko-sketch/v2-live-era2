import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

type Plan = {
  name: string;
  desc: string;
  price: string;
  label: string;
  cta: string;
  featured?: boolean;
  items: { text: string; note?: boolean }[];
};

const PLANS: Plan[] = [
  {
    name: "Старт",
    desc: "Попробовать и оживить пару снимков",
    price: "390",
    label: "От 16 ₽ за ролик",
    cta: "Выбрать «Старт»",
    items: [
      { text: "120 токенов в месяц, сгорают в конце месяца" },
      { text: "Около 24 роликов по 5 секунд на быстрой модели, или 8 на Kling 3.0" },
      { text: "Все сценарии и быстрые нейросети" },
      { text: "Качество до 720p, ролики до 10 секунд" },
      { text: "Оживление фото и видео по тексту" },
    ],
  },
  {
    name: "Про",
    desc: "Регулярно разбирать семейный архив",
    price: "990",
    label: "От 14 ₽ за ролик",
    cta: "Выбрать «Про»",
    featured: true,
    items: [
      { text: "350 токенов в месяц, неиспользованные переносятся" },
      { text: "Около 70 роликов по 5 секунд на быстрой модели, или 23 на Kling 3.0" },
      { text: "Всё из тарифа «Старт», плюс:", note: true },
      { text: "Премиум-модели: Veo 3.1, Kling O3 Pro" },
      { text: "Ролики до 15 секунд вместо 10" },
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
    items: [
      { text: "1000 токенов в месяц, неиспользованные переносятся" },
      { text: "Около 200 роликов по 5 секунд на быстрой модели, или 66 на Kling 3.0" },
      { text: "Всё из тарифа «Про», плюс:", note: true },
      { text: "Качество 4K", },
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

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start">
      <Icon
        icon="solar:check-circle-linear"
        width={16}
        height={16}
        className="mt-[3px] shrink-0 text-gold2"
      />
      <span className="ml-[10px] text-[13px] leading-[1.5] text-ink2">{text}</span>
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

        <p className="type-body mt-4 max-w-[560px]">
          На тарифах «Про» и «Ультра» неиспользованные токены переходят на следующий месяц. Отменить
          можно в личном кабинете, без звонков и писем.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              tabIndex={0}
              className={`relative flex h-full flex-col overflow-visible rounded-[16px] bg-surface shadow-card ${
                p.featured ? "border border-gold2" : "border border-rule"
              }`}
            >
              {p.featured && (
                <span className="type-label absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] text-white">
                  Выбирают чаще
                </span>
              )}

              <div
                className={`relative overflow-hidden rounded-t-[16px] border-b border-rule p-8 ${
                  p.featured ? "bg-gold3" : ""
                }`}
              >
                {p.featured && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(176,141,87,0.2) 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                      maskImage: "linear-gradient(to bottom, #000, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)",
                    }}
                  />
                )}
                <div className="relative">
                  <h3 className="text-[18px] font-normal text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-[13px] text-ink2">{p.desc}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-[44px] font-light leading-none tracking-[-0.04em] text-ink">
                      {p.price}
                    </span>
                    <span className="text-[14px] text-ink3">₽/мес</span>
                  </div>
                  <div className="type-label mt-1 text-gold">{p.label}</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="flex flex-col gap-3">
                  {p.items.map((it) =>
                    it.note ? (
                      <p key={it.text} className="my-1 text-[13px] italic text-ink3">
                        {it.text}
                      </p>
                    ) : (
                      <Feature key={it.text} text={it.text} />
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className={`mt-8 w-full rounded-[6px] p-[14px] text-[15px] transition-colors duration-300 ${
                    p.featured
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "border border-rule text-ink hover:border-gold2 hover:text-gold"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[16px] border border-rule bg-surface p-8">
          <p className="type-label">В любом тарифе</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ANY_PLAN.map((t) => (
              <Feature key={t} text={t} />
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
