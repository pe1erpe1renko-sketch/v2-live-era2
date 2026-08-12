import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const PILLS = ["улыбка", "взгляд в камеру", "поворот головы", "объятие"];

const STEPS = [
  {
    number: "01",
    title: "Загрузите снимок",
    description:
      "Подойдёт кадр с телефона, скан из альбома, портрет, иллюстрация или детский рисунок. JPG или PNG.",
  },
  {
    number: "02",
    title: "Задайте движение",
    description:
      "Выберите готовое — улыбка, взгляд в камеру, поворот головы, объятие. Или опишите сцену словами: нейросеть дополнит промпт сама.",
  },
  {
    number: "03",
    title: "Заберите MP4",
    description:
      "Через одну–три минуты ролик готов. Скачивайте вертикальным, квадратным или горизонтальным — водяных знаков нет ни на одном тарифе.",
  },
];

function StepMockup({ number }: { number: string }) {
  if (number === "01") {
    return (
      <div className="pointer-events-none mt-8 rounded-[6px] border border-dashed border-rule p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Icon
              icon="solar:gallery-add-linear"
              className="h-5 w-5 shrink-0 text-gold2"
            />
            <span className="truncate text-[12px] text-ink">бабушка_1958.jpg</span>
          </div>
          <Icon
            icon="solar:check-square-linear"
            className="h-5 w-5 shrink-0 text-gold2"
          />
        </div>
      </div>
    );
  }

  if (number === "02") {
    return (
      <div className="pointer-events-none mt-8 flex flex-wrap gap-2">
        {PILLS.map((pill, i) => (
          <span
            key={pill}
            className={
              i === 0
                ? "rounded-full bg-gold3 px-3 py-1.5 text-[12px] text-gold"
                : "rounded-full border border-rule px-3 py-1.5 text-[12px] text-ink2"
            }
          >
            {pill}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none mt-8 flex items-center justify-between gap-3 rounded-[6px] border border-rule px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          icon="solar:download-minimalistic-linear"
          className="h-5 w-5 shrink-0 text-gold2"
        />
        <span className="text-[12px] text-ink">Скачать MP4</span>
      </div>
      <span className="type-label whitespace-nowrap text-ink3">5 СЕК · 9:16</span>
    </div>
  );
}

export function Steps() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Три шага</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Как снимок превращается в видео
        </h2>

        <p className="type-body mt-4 max-w-[720px]">
          Первый ролик — без оплаты и без карты. Ниже весь путь от файла до готового MP4.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.number}
              className={
                i === 0
                  ? "lg:pr-12"
                  : "lg:border-l lg:border-rule lg:px-12"
              }
            >
              <span className="text-[48px] font-light leading-none text-gold2">
                {s.number}
              </span>
              <h3 className="mt-6 text-[18px] font-normal leading-[1.3] text-ink">
                {s.title}
              </h3>
              <p className="type-body mt-3">{s.description}</p>

              <StepMockup number={s.number} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-12 self-start rounded-[6px] bg-gold px-8 py-4 text-[15px] text-surface transition-colors hover:bg-gold-dark"
        >
          Оживить снимок бесплатно
        </button>
      </div>
    </section>
  );
}
