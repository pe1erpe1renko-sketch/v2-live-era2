import { Icon } from "@iconify/react";
import portraitOld from "@/assets/portrait-old.jpg";
import portraitRestored from "@/assets/portrait-restored.jpg";

export function Restoration() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <div className="overflow-hidden rounded-[16px] bg-ink p-6 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[45fr_55fr] lg:gap-12">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="block h-[6px] w-[6px] rounded-full bg-gold2" />
                <span className="type-label text-gold2">Реставрация</span>
              </div>

              <h2 className="mt-4 text-[clamp(24px,2.4vw,32px)] font-light leading-[1.1] tracking-[-0.04em] text-bg">
                Царапины уходят до анимации
              </h2>

              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.6] text-ink3">
                Заломы, выцветание и пятна нейросеть убирает сама — отдельно заказывать реставрацию
                не нужно. Чёрно-белое остаётся чёрно-белым: получается плёночный кадр, а не
                движущаяся помятая карточка.
              </p>

              <button
                type="button"
                className="mt-6 rounded-[6px] bg-gold px-10 py-[18px] text-[16px] text-white transition-colors duration-200 hover:bg-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold2"
              >
                Оживить старое фото →
              </button>

              <div className="type-label mt-3 text-ink3">Входит в сценарий · Без доплаты</div>
            </div>

            <div className="flex w-full box-border min-w-0 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex min-w-0 flex-1 basis-0 overflow-hidden rounded-[6px]">
                <Shot src={portraitOld} label="До" alt="Старое фото с царапинами и заломами" />
              </div>
              <Icon
                icon="solar:arrow-right-linear"
                width={24}
                height={24}
                className="mx-auto shrink-0 grow-0 basis-auto rotate-90 px-1 text-gold2 sm:mx-0 sm:rotate-0"
              />
              <div className="flex min-w-0 flex-1 basis-0 overflow-hidden rounded-[6px]">
                <Shot src={portraitRestored} label="После" alt="То же фото после реставрации" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shot({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[6px]">
      <img src={src} alt={alt} loading="lazy" className="aspect-[3/4] w-full object-cover" />
      <span className="type-label absolute bottom-3 left-3 inline-block w-auto whitespace-nowrap rounded-[6px] bg-black/60 px-2 py-1 text-[10px] text-bg">
        {label}
      </span>
    </div>
  );
}
