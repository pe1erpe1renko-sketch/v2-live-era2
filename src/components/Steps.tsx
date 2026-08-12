import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import portraitRestored from "@/assets/portrait-restored.jpg";

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
      <div className="pointer-events-none mt-3 rounded-[6px] border border-dashed border-rule p-4">
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
      <div className="pointer-events-none mt-3 flex flex-wrap gap-2">
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
    <div className="pointer-events-none mt-3 flex items-center justify-between gap-3 rounded-[6px] border border-rule px-4 py-3">
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

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[44%_56%] lg:items-stretch lg:gap-[48px]">
          {/* Left — example card */}
          <div className="flex flex-col rounded-2xl border border-rule bg-surface p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <span className="type-label text-ink3">Пример генерации</span>
            <div className="relative mt-3 aspect-[3/4] w-full overflow-hidden rounded-[6px] lg:aspect-auto lg:flex-1 lg:min-h-0">
              <img
                src={portraitRestored}
                alt="Оживлённый портрет — пример генерации"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <button
                type="button"
                aria-label="Воспроизвести"
                className="pointer-events-none absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-surface"
              >
                <Icon
                  icon="solar:play-linear"
                  className="h-5 w-5 text-gold"
                />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[13px] text-ink2">бабушка_1958.jpg</span>
              <span className="type-label text-ink3 whitespace-nowrap">
                KLING 3.0 · 5 СЕК
              </span>
            </div>
          </div>

          {/* Right — steps */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-8">
              {STEPS.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <span className="w-14 shrink-0 text-[36px] font-light leading-none text-gold2">
                    {s.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-normal leading-[1.3] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[1.6] text-ink2">
                      {s.description}
                    </p>
                    <StepMockup number={s.number} />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-8 self-start rounded-[6px] bg-gold px-8 py-4 text-[15px] text-surface transition-colors hover:bg-gold-dark"
            >
              Оживить снимок бесплатно
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
