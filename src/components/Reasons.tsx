import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const ITEMS = [
  {
    icon: "solar:album-linear",
    title: "Семейный архив",
    text: "Портреты бабушек и дедушек снова в движении",
  },
  {
    icon: "solar:gift-linear",
    title: "Подарок",
    text: "Ролик к юбилею из снимка, забытого на десятилетия",
  },
  {
    icon: "solar:smartphone-linear",
    title: "Лента и сторис",
    text: "Вертикальное видео из того, что уже лежит в галерее",
  },
  {
    icon: "solar:buildings-linear",
    title: "Музеи и краеведение",
    text: "Архивные кадры для выставок и публикаций",
  },
];

export function Reasons() {
  return (
    <section className="border-b border-rule" data-reveal>
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Зачем это нужно</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Четыре повода
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              tabIndex={0}
              className="flex flex-col rounded-[16px] border border-rule bg-surface p-6 shadow-card transition-colors duration-300 hover:border-gold2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold3">
                <Icon icon={it.icon} width={24} height={24} className="text-gold" />
              </div>
              <h3 className="mt-4 text-[16px] font-normal text-ink">{it.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.5] text-ink2">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
