import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

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
        <SectionLabel>Перед загрузкой</SectionLabel>
        <h2 className="mt-4 text-[clamp(28px,3vw,40px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что влияет на результат
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {TIPS.map((t) => (
            <div key={t.title} className="flex items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-gold3">
                <Icon icon={t.icon} width={20} height={20} className="text-gold" />
              </div>
              <div className="ml-4 min-w-0">
                <h3 className="text-[15px] font-normal text-ink">{t.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-ink2">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
