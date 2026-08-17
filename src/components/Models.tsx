import { SectionLabel } from "@/components/SectionLabel";

const ROW_TOP = ["KLING 3.0", "Kling 3.0 Motion Control", "MiniMax H3", "Hedra", "Seedance 2.0"];
const ROW_BOTTOM = ["Veo 3.1", "Grok", "Hailuo 2"];

function Item({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center">
      <span className="text-[24px] font-light leading-[1.35] text-ink2">{label}</span>
      <span className="mx-6 block h-[4px] w-[4px] shrink-0 rounded-full bg-gold2" />
    </span>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask group relative overflow-hidden">
      {/* animated track (hidden when reduced motion) */}
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-rev" : ""} group-hover:[animation-play-state:paused]`}
      >
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex shrink-0 items-center">
            {items.map((it) => (
              <Item key={`${n}-${it}`} label={it} />
            ))}
          </span>
        ))}
      </div>
      {/* static fallback for reduced motion */}
      <div className="marquee-static hidden flex-wrap items-center gap-y-2">
        {items.map((it) => (
          <Item key={it} label={it} />
        ))}
      </div>
    </div>
  );
}

export function Models() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-12 lg:px-16">
        <SectionLabel>Восемь моделей</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Не одна нейросеть, а весь набор сразу
        </h2>

        <p className="type-body mt-4 max-w-[820px]">
          Kling держит мимику, Hedra заставляет портрет говорить, Seedance даёт максимальное
          качество, Veo добавляет звук. В сценариях модель подбирается под задачу сама, в прямом
          доступе выбираете вручную. Движки обновляем в день релиза.
        </p>

        <div className="mt-12">
          <Marquee items={ROW_TOP} />
          <div className="mt-6">
            <Marquee items={ROW_BOTTOM} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
