import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const MOTIONS = ["улыбка", "взгляд в камеру", "поворот головы", "объятие"];

function StepColumn({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule p-8 first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0">
      <p className="text-[48px] font-light leading-none text-gold2">{number}</p>
      <h3 className="mt-6 text-[18px] font-normal text-ink">{title}</h3>
      <p className="type-body mt-3">{description}</p>
      <div className="mt-6">{children}</div>
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

        <div className="mt-12 grid border-y border-rule lg:grid-cols-3">
          <StepColumn
            number="01"
            title="Загрузите снимок"
            description="Подойдёт кадр с телефона, скан из альбома, портрет, иллюстрация или детский рисунок. JPG или PNG."
          >
            <div className="flex items-center gap-3 rounded-[6px] border border-dashed border-rule p-4">
              <Icon icon="solar:gallery-add-linear" className="h-5 w-5 shrink-0 text-gold2" />
              <span className="truncate text-[12px] text-ink">бабушка_1958.jpg</span>
              <Icon
                icon="solar:check-circle-linear"
                className="ml-auto h-4 w-4 shrink-0 text-gold2"
              />
            </div>
          </StepColumn>

          <StepColumn
            number="02"
            title="Задайте движение"
            description="Выберите готовое — улыбка, взгляд в камеру, поворот головы, объятие. Или опишите сцену словами: нейросеть дополнит промпт сама."
          >
            <div className="flex flex-wrap gap-3">
              {MOTIONS.map((m, i) => (
                <span
                  key={m}
                  className={`rounded-full px-3 py-1.5 text-[12px] ${
                    i === 0 ? "bg-gold3 text-gold" : "border border-rule text-ink2"
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>
          </StepColumn>

          <StepColumn
            number="03"
            title="Заберите MP4"
            description="Через одну–три минуты ролик готов. Скачивайте вертикальным, квадратным или горизонтальным — водяных знаков нет ни на одном тарифе."
          >
            <div className="flex items-center gap-3 rounded-[6px] border border-rule px-4 py-3">
              <Icon
                icon="solar:download-minimalistic-linear"
                className="h-5 w-5 shrink-0 text-gold2"
              />
              <span className="text-[12px] text-ink">Скачать MP4</span>
              <span className="type-label ml-auto whitespace-nowrap">5 сек · 9:16</span>
            </div>
          </StepColumn>
        </div>

        <button
          type="button"
          className="mt-12 rounded-[6px] bg-gold px-8 py-4 text-[15px] text-surface transition-colors hover:bg-gold-dark"
        >
          Оживить снимок бесплатно
        </button>
      </div>
    </section>
  );
}
