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
    title: "Семейный архив",
    text: "Портреты бабушек и дедушек снова в движении",
  },
  {
    image: GIFT_IMG,
    title: "Подарок",
    text: "Ролик к юбилею из забытого снимка",
  },
  {
    image: FEED_IMG,
    title: "Лента и сторис",
    text: "Вертикальное видео из того, что уже в галерее",
  },
  {
    image: MUSEUM_IMG,
    title: "Музеи и краеведение",
    titleSize: 14,
    text: "Архивные кадры для выставок",
  },
];

export function Reasons() {
  return (
    <section className="border-b border-rule" data-reveal>
      <div className="mx-auto max-w-[1440px] px-8 py-12 lg:px-16">
        <SectionLabel>Зачем это нужно</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Четыре повода
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <a
              key={it.title}
              href="#"
              className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold2"
            >
              <img
                src={it.image}
                alt={it.title}
                width={768}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.6,1)] group-hover:scale-[1.04]"
              />
              <div
                className="absolute bottom-[10px] left-[10px] right-[10px] max-h-[33%] overflow-hidden rounded-[6px] p-3 backdrop-blur-[12px] [background:rgba(0,0,0,0.55)]"
              >
                <h3
                  className="text-white font-normal leading-tight"
                  style={{ fontSize: it.titleSize ?? 15 }}
                >
                  {it.title}
                </h3>
                <p className="mt-[4px] line-clamp-2 text-[12px] leading-[1.35] [color:rgba(255,255,255,0.8)]">
                  {it.text}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
