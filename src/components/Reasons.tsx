import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import archiveImg from "@/assets/reason-archive.jpg";
import giftImg from "@/assets/reason-gift.jpg";
import feedImg from "@/assets/reason-feed.jpg";
import museumImg from "@/assets/reason-museum.jpg";

// Separate image variables so they can be swapped for video later.
const ARCHIVE_IMG = archiveImg;
const GIFT_IMG = giftImg;
const FEED_IMG = feedImg;
const MUSEUM_IMG = museumImg;

const ITEMS = [
  {
    image: ARCHIVE_IMG,
    icon: "solar:album-linear",
    title: "Семейный архив",
    text: "Портреты бабушек и дедушек снова в движении",
  },
  {
    image: GIFT_IMG,
    icon: "solar:gift-linear",
    title: "Подарок",
    text: "Ролик к юбилею из снимка, забытого на десятилетия",
  },
  {
    image: FEED_IMG,
    icon: "solar:smartphone-linear",
    title: "Лента и сторис",
    text: "Вертикальное видео из того, что уже лежит в галерее",
  },
  {
    image: MUSEUM_IMG,
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
              className="group relative aspect-[3/4] overflow-hidden rounded-[16px]"
            >
              <img
                src={it.image}
                alt={it.title}
                width={768}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.6,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0.15)] transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.6,1)] group-hover:from-[rgba(0,0,0,0.82)]" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[rgba(255,255,255,0.15)]">
                  <Icon icon={it.icon} width={20} height={20} className="text-white" />
                </div>
                <h3 className="mt-4 text-[17px] font-normal text-white">{it.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-[rgba(255,255,255,0.75)]">
                  {it.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
