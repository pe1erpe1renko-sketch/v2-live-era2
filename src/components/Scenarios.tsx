import { useRef, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import archive1 from "@/assets/sc-archive-1.jpg";
import archive2 from "@/assets/sc-archive-2.jpg";
import archive3 from "@/assets/sc-archive-3.jpg";
import family1 from "@/assets/sc-family-1.jpg";
import family2 from "@/assets/sc-family-2.jpg";
import family3 from "@/assets/sc-family-3.jpg";
import draw1 from "@/assets/sc-draw-1.jpg";
import draw2 from "@/assets/sc-draw-2.jpg";
import draw3 from "@/assets/sc-draw-3.jpg";
import feed1 from "@/assets/sc-feed-1.jpg";
import feed2 from "@/assets/sc-feed-2.jpg";
import feed3 from "@/assets/sc-feed-3.jpg";

type Card = { title: string; text: string; img: string };

const TABS: { id: string; label: string; cards: Card[] }[] = [
  {
    id: "archive",
    label: "Архив",
    cards: [
      {
        title: "Старое фото",
        text: "Снимок шестидесятых снова в движении: заломы и царапины уходят до анимации",
        img: archive1,
      },
      {
        title: "Фото к 9 Мая",
        text: "Портрет прадеда с фронтовой карточки — бережная мимика, без домысливания черт",
        img: archive2,
      },
      {
        title: "Встреча с собой в детстве",
        text: "Два кадра, вы сегодня и вы ребёнком, сходятся в одной сцене",
        img: archive3,
      },
    ],
  },
  {
    id: "family",
    label: "Близкие",
    cards: [
      {
        title: "Портрет",
        text: "Лицо крупным планом: взгляд, улыбка, едва заметный поворот головы",
        img: family1,
      },
      {
        title: "Фото питомца",
        text: "Кот потягивается, пёс поворачивает морду к камере",
        img: family2,
      },
      {
        title: "Подарок к юбилею",
        text: "Ролик из карточки, которую человек не видел десятилетиями",
        img: family3,
      },
    ],
  },
  {
    id: "draw",
    label: "Рисунки",
    cards: [
      {
        title: "Детский рисунок",
        text: "Дракон с альбомного листа расправляет крылья, линии остаются детскими",
        img: draw1,
      },
      {
        title: "Иллюстрация",
        text: "Скетч или обложка приходит в движение без перерисовки стиля",
        img: draw2,
      },
      {
        title: "Картина",
        text: "Живописный портрет оживает, мазок и фактура холста сохраняются",
        img: draw3,
      },
    ],
  },
  {
    id: "feed",
    label: "Лента",
    cards: [
      {
        title: "Видео из фото",
        text: "Пейзаж, товар или кадр из поездки: движение и ход камеры из одного снимка",
        img: feed1,
      },
      {
        title: "Танец из кадра",
        text: "Фигура с фотографии начинает двигаться в такт",
        img: feed2,
      },
      {
        title: "Видео из текста",
        text: "Фотографии нет — опишите сцену словами, ролик соберётся с нуля",
        img: feed3,
      },
    ],
  },
];

export function Scenarios() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const cards = TABS[active]?.cards ?? [];

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Сценарии</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Сценарии: под каждую задачу свои настройки
        </h2>

        <p className="type-body mt-4 max-w-[720px]">
          Внутри сценария нейросеть и промпт подбираются сами. Хотите управлять вручную — все модели
          и параметры открыты в прямом доступе.
        </p>

        <div
          role="tablist"
          aria-label="Сценарии"
          onKeyDown={onKeyDown}
          className="mt-12 flex flex-wrap gap-6 border-b border-rule"
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`type-label -mb-px border-b-2 px-1 py-3 transition-colors ${
                active === i
                  ? "border-gold2 text-ink"
                  : "border-transparent text-ink3 hover:text-ink2"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.title}
              href="#"
              className="group block h-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold2 overflow-hidden rounded-[16px] border border-rule bg-surface shadow-card transition-colors duration-200 hover:border-gold2"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={820}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.6,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-normal text-ink">{c.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.5] text-ink2">{c.text}</p>
              </div>
            </a>
          ))}
        </div>

        <a href="#form" className="mt-8 inline-block text-[14px] text-gold">
          Все сценарии →
        </a>
      </div>
    </section>
  );
}
