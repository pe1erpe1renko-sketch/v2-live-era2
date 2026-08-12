import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import portraitOld from "@/assets/portrait-old.jpg";
import portraitRestored from "@/assets/portrait-restored.jpg";

const TIPS = [
  {
    icon: "solar:crop-minimalistic-linear",
    title: "Лицо крупным планом",
    text: "Чем больше лицо в кадре, тем точнее мимика. Групповые снимки работают, но дальние лица могут поплыть.",
  },
  {
    icon: "solar:sun-linear",
    title: "Ровный свет",
    text: "Резкая тень на половине лица мешает нейросети найти черты. Переснимайте при дневном свете, без бликов от лампы.",
  },
  {
    icon: "solar:user-rounded-linear",
    title: "Лицо целиком",
    text: "Не обрезайте лоб и подбородок. Шляпа, тёмные очки и чёлка на глаза тоже мешают.",
  },
  {
    icon: "solar:camera-linear",
    title: "Фронтальный кадр",
    text: "Если голова повёрнута сильнее чем на треть профиля, часть черт алгоритм начинает додумывать, и лицо искажается.",
  },
];

export function Tips() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <div className="grid items-stretch gap-12 lg:grid-cols-[48%_52%]">
          <div>
            <SectionLabel>Перед загрузкой</SectionLabel>
            <h2 className="mt-4 text-[clamp(28px,3vw,40px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
              Что влияет на результат
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              {TIPS.map((t) => (
                <div key={t.title} className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-gold3">
                    <Icon icon={t.icon} width={20} height={20} className="text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[15px] font-normal text-ink">{t.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.5] text-ink2">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full min-w-0 flex-col rounded-[16px] bg-ink p-8">
            <div className="flex items-center gap-3">
              <span className="block h-[6px] w-[6px] rounded-full bg-gold2" />
              <span className="type-label text-gold2">Реставрация</span>
            </div>

            <h2 className="mt-4 text-[28px] font-light leading-[1.1] tracking-[-0.04em] text-bg">
              Царапины уходят до анимации
            </h2>

            <p className="mt-4 text-[14px] leading-[1.6] text-ink3">
              Заломы, выцветание и пятна нейросеть убирает сама — отдельно заказывать реставрацию
              не нужно. Чёрно-белое остаётся чёрно-белым: получается плёночный кадр, а не
              движущаяся помятая карточка.
            </p>

            <div className="mt-6 flex items-center">
              <Thumb src={portraitOld} label="С царапинами" alt="Старое фото с царапинами и заломами" />
              <Icon
                icon="solar:arrow-right-linear"
                width={20}
                height={20}
                className="mx-4 shrink-0 text-gold2"
              />
              <Thumb src={portraitRestored} label="Восстановлено" alt="То же фото после реставрации" />
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-[6px] bg-gold p-4 text-[15px] text-white transition-colors duration-200 hover:bg-gold-dark"
            >
              Оживить старое фото →
            </button>

            <div className="type-label mt-3 text-center text-ink3">
              Входит в сценарий · Без доплаты
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Thumb({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden rounded-[6px]">
      <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <span className="type-label absolute bottom-2 left-2 rounded-[6px] bg-black/60 px-2 py-1 text-[10px] text-bg">
        {label}
      </span>
    </div>
  );
}
