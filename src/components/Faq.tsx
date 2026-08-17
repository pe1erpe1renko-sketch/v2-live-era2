import { useId, useState } from "react";
import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const FAQ = [
  {
    q: "Как оживить фото бесплатно?",
    a: "Загрузите снимок, выберите движение и запустите генерацию — первый ролик мы делаем бесплатно и карту для этого не спрашиваем. Дальше работа идёт на токенах: их покупают пакетом без подписки или оформляют месячный тариф.",
  },
  {
    q: "Нужна ли регистрация?",
    a: "Для первой генерации — нет. Аккаунт понадобится, когда захотите сохранять историю роликов и покупать токены.",
  },
  {
    q: "Сохранится ли сходство с оригиналом?",
    a: "Да. Нейросеть добавляет движение поверх исходного кадра, а не перерисовывает лицо. Черты, причёска и тон кожи остаются прежними. На фронтальных портретах с ровным светом сходство держится лучше всего.",
  },
  {
    q: "Какие снимки подходят, а какие нет?",
    a: "Лучше всего работают фронтальные портреты, где лицо занимает заметную часть кадра. Хуже — профиль, резкая тень на пол-лица, обрезанный лоб или подбородок, очень низкое разрешение. Групповые кадры принимаются, но дальние лица могут получиться менее чёткими.",
  },
  {
    q: "Можно ли сделать видео без фотографии?",
    a: "Да. Переключите первый экран на «Видео из текста» и опишите сцену словами — ролик соберётся с нуля, снимок не нужен.",
  },
  {
    q: "Сколько ждать результат?",
    a: "Обычно одна–три минуты. При высокой нагрузке дольше. Вкладку можно закрыть: готовый ролик появится в истории генераций.",
  },
  {
    q: "Что происходит с моими фотографиями?",
    a: "Снимок уходит на сервер, обрабатывается и возвращается уже видео. Материалы используются только для выполнения вашей генерации. Ролики приватны и в общую галерею не попадают.",
  },
  {
    q: "Можно ли заплатить один раз, без подписки?",
    a: "Да, есть разовые пакеты токенов. Водяных знаков на них тоже нет, а сами токены не сгорают.",
  },
  {
    q: "Что будет, если отменить подписку?",
    a: "Оплаченный период доработает до конца. Токены из разовых пакетов остаются с вами и после отмены.",
  },
  {
    q: "Сколько роликов выйдет из пакета токенов?",
    a: "Зависит от модели. Hailuo 2 расходует двенадцать токенов на пятисекундный ролик, KLING 3.0 — тридцать один, Seedance 2.0 — шестьдесят два, зато держит детали точнее. Из 260 токенов тарифа «Про» выходит около двадцати восьми роликов на экономной модели или восьми на KLING.",
  },
  {
    q: "Можно ли использовать ролики в рекламе?",
    a: "Да, коммерческое использование разрешено. Права на загруженный снимок и на готовое видео остаются у вас.",
  },
  {
    q: "Чем нейросеть лучше обычной программы для анимации?",
    a: "В программе движение нужно собирать вручную: ставить точки, рисовать траектории, тратить часы. Нейросети достаточно одного кадра — она сама определяет, что и как должно двигаться.",
  },
];

const LD_JSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

type FaqEntry = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number[]>([]);
  const uid = useId();
  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? [] : [i]));
  const half = Math.ceil(items.length / 2);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {[items.slice(0, half), items.slice(half)].map((col, ci) => (
        <div key={ci}>
          {col.map((item, i) => {
            const index = ci === 0 ? i : i + half;
            return (
              <FaqItem
                key={item.q}
                item={item}
                index={index}
                isOpen={open.includes(index)}
                onToggle={() => toggle(index)}
                uid={uid}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
  uid,
}: {
  item: FaqEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  uid: string;
}) {
  const number = String(index + 1).padStart(2, "0");


  return (
    <div className="border-t border-rule">
      <h3>
        <button
          type="button"
          id={`${uid}-btn-${index}`}
          aria-expanded={isOpen}
          aria-controls={`${uid}-panel-${index}`}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-4 text-left"
        >
          <span className="type-label w-8 shrink-0 text-gold2">{number}</span>
          <span className="flex-1 text-[15px] font-normal leading-[1.4] text-ink">
            {item.q}
          </span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={16}
            height={16}
            className={`shrink-0 transition-transform duration-[250ms] ease-slow ${
              isOpen
                ? "rotate-180 text-gold2"
                : "text-ink3 group-hover:text-gold2"
            }`}
          />
        </button>
      </h3>
      <div
        id={`${uid}-panel-${index}`}
        role="region"
        aria-labelledby={`${uid}-btn-${index}`}
        hidden={!isOpen}
        className="pb-4 pl-8"
      >
        <p className="pt-1 text-[13px] leading-[1.6] text-ink2">{item.a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="border-b border-rule">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD_JSON }} />
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Вопросы</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Частые вопросы
        </h2>

        <div className="mt-6">
          <FaqAccordion items={FAQ} />
        </div>
      </div>

    </section>
  );
}
