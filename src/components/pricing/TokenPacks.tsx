import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

type Pack = {
  name: string;
  desc: string;
  price: string;
  label: string;
  featured?: boolean;
  items: { text: string; off?: boolean }[];
};

const BASE = (tokens: string, clips: string) => [
  { text: `${tokens} токенов` },
  { text: clips },
  { text: "Токены не сгорают" },
  { text: "Все сценарии и нейросети" },
];

const PACKS: Pack[] = [
  {
    name: "Старт",
    desc: "Попробовать без подписки",
    price: "490",
    label: "От 20 ₽ за ролик",
    items: [
      ...BASE("120", "≈ 24 ролика, или 8 на Kling 3.0"),
      { text: "Без автоматических списаний" },
      { text: "Без водяных знаков" },
      { text: "Возврат токенов при сбое" },
      { text: "Приоритетная очередь", off: true },
    ],
  },
  {
    name: "Оптимальный",
    desc: "Лучшая цена за ролик",
    price: "1 240",
    label: "От 18 ₽ за ролик",
    featured: true,
    items: [
      ...BASE("350", "≈ 70 роликов, или 23 на Kling 3.0"),
      { text: "Несколько снимков в одной сцене" },
      { text: "Без автоматических списаний" },
      { text: "Без водяных знаков" },
      { text: "Возврат токенов при сбое" },
      { text: "Приоритетная очередь", off: true },
    ],
  },
  {
    name: "Бизнес",
    desc: "Для регулярной работы",
    price: "3 060",
    label: "От 15 ₽ за ролик",
    items: [
      ...BASE("1000", "≈ 200 роликов, или 66 на Kling 3.0"),
      { text: "Несколько снимков в одной сцене" },
      { text: "Качество 4K" },
      { text: "Без автоматических списаний" },
      { text: "Без водяных знаков" },
      { text: "Приватные генерации" },
      { text: "Приоритетная очередь" },
    ],
  },
  {
    name: "Макс",
    desc: "Максимальный объём",
    price: "5 490",
    label: "От 14 ₽ за ролик",
    items: [
      ...BASE("2000", "≈ 400 роликов, или 133 на Kling 3.0"),
      { text: "Несколько снимков в одной сцене" },
      { text: "Качество 4K" },
      { text: "Без автоматических списаний" },
      { text: "Без водяных знаков" },
      { text: "Приватные генерации" },
      { text: "Приоритетная очередь" },
    ],
  },
];

const PAY = ["МИР", "VISA", "MASTERCARD"];

export function TokenPacks() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1);

  const scrollToCard = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
    setActiveIdx(i);
  };

  const onScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement;
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (d < dist) {
        dist = d;
        nearest = i;
      }
    });
    setActiveIdx(nearest);
  };

  return (
    <div>
      <div
        ref={carouselRef}
        onScroll={onScroll}
        className="mt-12 -mx-8 flex items-stretch gap-3 overflow-x-auto px-4 pb-2 pt-4 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-4 lg:grid-cols-4"
      >
        {PACKS.map((p, idx) => (
          <article
            key={p.name}
            tabIndex={0}
            className={`relative flex h-full w-[80vw] shrink-0 snap-center flex-col rounded-[16px] bg-surface p-6 shadow-card transition-[opacity,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:w-auto md:shrink md:scale-100 md:opacity-100 ${
              p.featured ? "border border-gold2" : "border border-rule"
            } ${activeIdx === idx ? "scale-100 opacity-100" : "scale-[0.94] opacity-50"}`}
          >
            {p.featured && (
              <span className="type-label absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] text-white">
                Выгоднее всего
              </span>
            )}

            <h3 className="text-[17px] font-normal text-ink">{p.name}</h3>
            <p className="mt-1 text-[13px] text-ink2">{p.desc}</p>

            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="text-[34px] font-light leading-none tracking-[-0.04em] text-ink">
                {p.price}
              </span>
              <span className="text-[14px] text-ink3">₽</span>
            </div>
            <div className="type-label mt-1 text-gold">{p.label}</div>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-rule pt-5">
              {p.items.map((it) => (
                <div key={it.text} className="flex items-start">
                  <Icon
                    icon={it.off ? "solar:close-circle-linear" : "solar:check-circle-linear"}
                    width={16}
                    height={16}
                    className="mt-[2px] shrink-0 text-ink3"
                  />
                  <span
                    className={`ml-[10px] block text-[13px] leading-[1.4] ${
                      it.off ? "text-ink3 line-through" : "text-ink2"
                    }`}
                  >
                    {it.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`mt-auto w-full rounded-[6px] p-[14px] text-center text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                p.featured
                  ? "bg-gold text-white hover:bg-gold-dark"
                  : "border border-rule text-ink hover:border-gold2 hover:text-gold"
              }`}
              style={{ marginTop: 20 }}
            >
              Оплатить
            </button>

            <div className="mt-3 flex justify-center gap-1.5">
              {PAY.map((t) => (
                <span
                  key={t}
                  className="rounded-[4px] border border-rule px-2 py-[3px] text-[10px] text-ink3"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2 md:hidden">
        {PACKS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => scrollToCard(i)}
            className={`min-h-[44px] rounded-full px-4 py-2.5 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
              activeIdx === i ? "bg-gold text-white" : "border border-rule text-ink2"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-[13px] text-ink3">
        Купили — потратили — докупили, когда нужно. Автоматических списаний нет.
      </p>
    </div>
  );
}
