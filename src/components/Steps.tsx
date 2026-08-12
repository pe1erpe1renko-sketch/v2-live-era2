import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import portraitRestored from "@/assets/portrait-restored.jpg";

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

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-12">
          <div className="lg:w-[42%]">
            <div className="flex flex-col gap-8">
              {STEPS.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <span className="w-16 shrink-0 text-[40px] font-light leading-none text-gold2">
                    {s.number}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-normal leading-[1.3] text-ink">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-ink2">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-12 rounded-[6px] bg-gold px-8 py-4 text-[15px] text-surface transition-colors hover:bg-gold-dark"
            >
              Оживить снимок бесплатно
            </button>
          </div>

          <div className="lg:w-[58%]">
            <div className="rounded-[16px] border border-rule bg-surface p-4 shadow-panel">
              <div className="type-label text-ink3">Пример генерации</div>

              <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[6px]">
                <img
                  src={portraitRestored}
                  alt="Оживлённый портрет — пример генерации"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-surface"
                >
                  <Icon icon="solar:play-linear" className="h-5 w-5 text-gold" />
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-[13px] text-ink2">бабушка_1958.jpg</span>
                <span className="type-label whitespace-nowrap text-ink3">Kling 3.0 · 5 сек</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
