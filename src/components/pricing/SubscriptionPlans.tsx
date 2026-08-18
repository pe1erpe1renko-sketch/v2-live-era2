import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

type Plan = {
  name: string;
  desc: string;
  price: string;
  label: string;
  packNote: string;
  tokens: string;
  tokenNote: string;
  fill: string;
  clips: string;
  featured?: boolean;
  items: { text: string; note?: boolean }[];
};

const PLANS: Plan[] = [
  {
    name: "Старт",
    desc: "Попробовать и оживить пару снимков",
    price: "490",
    label: "От 41 ₽ за ролик",
    packNote: "те же токены пакетом — 590 ₽",
    tokens: "115",
    tokenNote: "сгорают в конце месяца",
    fill: "15%",
    clips: "≈ 12 роликов",
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
    label: "От 35 ₽ за ролик",
    packNote: "те же токены пакетом — 1 290 ₽",
    tokens: "260",
    tokenNote: "остаток переносится",
    fill: "34%",
    clips: "≈ 28 роликов",
    featured: true,
    items: [
      { text: "Всё из «Старта», плюс:", note: true },
      { text: "Премиум-модели: Veo 3.1, Seedance 2.0, Kling 3.0" },
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
    label: "От 29 ₽ за ролик",
    packNote: "те же токены пакетом — 3 490 ₽",
    tokens: "760",
    tokenNote: "остаток переносится",
    fill: "100%",
    clips: "≈ 84 ролика",
    items: [
      { text: "Всё из «Про», плюс:", note: true },
      { text: "Качество 4K на Veo 3.1 и KLING 3.0" },
      { text: "Две генерации одновременно" },
    ],
  },
];

function Feature({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-start">
      <Icon
        icon="solar:check-circle-linear"
        width={15}
        height={15}
        className={`mt-[3px] shrink-0 ${dark ? "text-[#71717A]" : "text-ink3"}`}
      />
      <span
        className={`ml-[10px] block text-[13px] leading-[1.4] ${dark ? "text-[#FAFAFA]" : "text-ink2"}`}
      >
        {text}
      </span>
    </div>
  );
}

const PLAN_SLUGS: Record<string, string> = {
  "Старт": "start",
  "Про": "pro",
  "Ультра": "ultra",
};

export function SubscriptionPlans() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(false), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  const scrollToCard = (i: number, smooth: boolean) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    setActiveIdx(i);
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) scrollToCard(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className="mt-6 -mx-8 flex items-stretch gap-3 overflow-x-auto px-4 pb-2 pt-4 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:items-stretch md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
      >
        {PLANS.map((p, idx) => {
          const dark = !!p.featured;
          return (
            <article
              key={p.name}
              tabIndex={0}
              className={`relative flex h-full w-[76vw] shrink-0 snap-center flex-col rounded-[16px] p-7 shadow-card transition-[opacity,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:w-auto md:shrink md:opacity-100 md:scale-100 ${
                dark ? "bg-ink" : "border border-rule bg-surface"
              } ${activeIdx === idx ? "scale-100 opacity-100" : "scale-[0.94] opacity-50"}`}
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
                <span className="text-[14px] text-ink3">₽/мес</span>
              </div>
              <div className={`type-label mt-1 ${dark ? "text-gold2" : "text-gold"}`}>{p.label}</div>
              <p className={`mt-1 text-[12px] ${dark ? "text-[#A1A1AA]" : "text-ink3"}`}>
                {p.packNote}
              </p>

              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <span className={`type-label ${dark ? "text-ink3" : "text-ink2"}`}>
                    Токенов в месяц
                  </span>
                  <span
                    className={`text-[20px] font-light leading-none ${dark ? "text-gold2" : "text-gold"}`}
                  >
                    {p.tokens}
                  </span>
                </div>
                <div
                  className={`mt-2.5 h-[6px] w-full overflow-hidden rounded-full ${dark ? "bg-[#3F3F46]" : "bg-rule"}`}
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
                    <Feature key={it.text} text={it.text} dark={dark} />
                  ),
                )}
              </div>

              <a
                href={`/checkout?plan=${PLAN_SLUGS[p.name]}&period=1month`}
                className={`mt-auto block w-full rounded-[6px] p-3 text-center text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  dark
                    ? "bg-gold text-white hover:bg-gold-dark"
                    : "border border-gold bg-surface text-gold hover:bg-gold hover:text-white"
                }`}
                style={{ marginTop: 24 }}
              >
                {`Выбрать «${p.name}»`}
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2 md:hidden">
        {PLANS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => scrollToCard(i, true)}
            className={`min-h-[44px] rounded-full px-5 py-2.5 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
              activeIdx === i ? "bg-gold text-white" : "border border-rule text-ink2"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            // TODO backend: отключение автопродления на сервере
            setNotice(true);
          }}
          className="text-[13px] text-ink2 underline underline-offset-2 transition-colors hover:text-ink"
        >
          Отключить автопродление подписки
        </button>
      </div>

      {notice && (
        <div className="fixed bottom-5 right-5 z-50 w-[320px] rounded-[12px] border border-rule bg-surface p-4 shadow-card">
          <button
            type="button"
            onClick={() => setNotice(false)}
            aria-label="Закрыть"
            className="absolute right-3 top-3 text-ink3 transition-colors hover:text-ink"
          >
            <Icon icon="solar:close-circle-linear" width={16} height={16} />
          </button>
          <p className="pr-6 text-[14px] text-ink">Автопродление отключено</p>
          <p className="mt-1 pr-6 text-[13px] leading-[1.4] text-ink2">
            Подписка доработает до конца оплаченного периода и не продлится
          </p>
        </div>
      )}
    </div>
  );
}
