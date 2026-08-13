import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { LightLayout } from "@/components/layouts/LightLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { AppLink } from "@/components/AppLink";
import { EXAMPLES, EXAMPLE_FILTERS, type Example } from "@/components/examples/data";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Примеры работ — Live Era2" },
      {
        name: "description",
        content:
          "Галерея роликов Live Era2: архивные снимки, портреты, питомцы и рисунки, оживлённые из одной фотографии.",
      },
      { property: "og:title", content: "Примеры работ — Live Era2" },
      {
        property: "og:description",
        content: "Ролики Live Era2, сделанные из одной фотографии — без постановки и ретуши.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function ExampleCard({ item }: { item: Example }) {
  return (
    <article className="group overflow-hidden rounded-[16px] border border-rule bg-surface shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-gold2 focus-within:border-gold2">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.poster}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-200 ease-slow group-hover:scale-[1.03]"
        />
        <button
          type="button"
          aria-label={`Смотреть: ${item.title}`}
          // TODO: заглушка — вместо постера появится видео-ролик
          onClick={() => {}}
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-[8px] transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Icon icon="solar:play-bold" width={18} height={18} className="text-gold" />
        </button>
        <span
          className="type-label absolute bottom-3 left-3 rounded-[6px] px-2.5 py-1 text-[10px] text-white backdrop-blur-[8px]"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          {item.scenario}
        </span>
      </div>

      <div className="p-[18px]">
        <h3 className="text-[15px] font-normal text-ink">{item.title}</h3>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-ink2">{item.text}</p>
        <p className="type-label mt-3.5 border-t border-rule pt-2.5 text-[10px] text-ink3">
          {item.meta}
        </p>
      </div>
    </article>
  );
}

function Page() {
  const [filter, setFilter] = useState<string>("Все");
  const items = filter === "Все" ? EXAMPLES : EXAMPLES.filter((e) => e.category === filter);

  return (
    <LightLayout>
      <section className="mx-auto max-w-[1440px] px-4 pb-16 pt-10 sm:px-8 sm:pt-16 lg:px-16">
        <SectionLabel>Примеры</SectionLabel>
        <h1 className="mt-4 text-[clamp(32px,4vw,52px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что получается на обычных снимках
        </h1>
        <p className="mt-3 max-w-[720px] text-[15px] leading-[1.6] text-ink2">
          Без постановочных кадров и ретуши. Каждый ролик сделан из одной фотографии — наведите,
          чтобы посмотреть.
        </p>

        <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto no-scrollbar px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {EXAMPLE_FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`min-h-[40px] shrink-0 cursor-pointer whitespace-nowrap rounded-[6px] px-[18px] py-2 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  on
                    ? "border border-gold bg-gold text-white"
                    : "border border-rule text-ink2 hover:border-gold2"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <ExampleCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center rounded-[16px] border border-rule bg-surface px-5 py-8 text-center sm:p-8">
          <h2 className="text-[24px] font-light text-ink">Попробуйте на своём снимке</h2>
          <p className="mt-2.5 text-[14px] text-ink2">Первый ролик бесплатно, карта не нужна.</p>
          <AppLink
            href="/create"
            className="mt-5 inline-block rounded-[6px] bg-gold px-8 py-3.5 text-[14px] text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          >
            Оживить фото
          </AppLink>
        </div>
      </section>
    </LightLayout>
  );
}
