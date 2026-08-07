import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const ITEMS = [
  {
    icon: "solar:album-linear",
    title: "Семейный архив",
    text: "Прабабушка с карточки 1958 года моргает и поворачивает голову. Дети видят предков живыми, а не строгими лицами с выцветшей бумаги.",
  },
  {
    icon: "solar:gift-linear",
    title: "Подарок",
    text: "Юбилей, свадьба, годовщина: ролик из снимка, который человек не доставал десятилетиями. Действует сильнее любой открытки.",
  },
  {
    icon: "solar:smartphone-linear",
    title: "Лента и сторис",
    text: "Вертикальное видео из фотографии, которая уже лежит в галерее. Без съёмки, без монтажа, без водяного знака.",
  },
  {
    icon: "solar:buildings-linear",
    title: "Музеи и краеведение",
    text: "Архивные снимки для выставок, публикаций и школьных проектов. Права на результат остаются у вас.",
  },
];

export function Reasons() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Зачем это нужно</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Четыре повода оживить снимок
        </h2>

        <p className="type-body mt-4 max-w-[560px]">
          Сценарии разные, а снимок нужен всего один.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              tabIndex={0}
              className="rounded-[16px] border border-rule bg-surface p-8 shadow-card transition-colors duration-300 hover:border-gold2"
            >
              <Icon icon={it.icon} width={28} height={28} className="text-gold2" />
              <h3 className="mt-4 text-[18px] font-normal text-ink">{it.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink2">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
