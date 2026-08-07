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
    a: "Зависит от модели. Быстрые расходуют около пяти токенов на пятисекундный ролик, Kling 3.0 — примерно пятнадцать, зато держит детали точнее. Из 350 токенов выходит около семидесяти роликов на быстрой модели.",
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

export function Faq() {
  const [open, setOpen] = useState<number[]>([0]);
  const uid = useId();

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className="border-b border-rule">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD_JSON }} />
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Вопросы</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Частые вопросы
        </h2>

        <div className="mt-8 overflow-hidden rounded-[16px] border border-rule bg-surface">
          {FAQ.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={f.q} className={i > 0 ? "border-t border-rule" : ""}>
                <h3>
                  <button
                    type="button"
                    id={`${uid}-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-panel-${i}`}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-normal text-ink transition-colors duration-300 hover:bg-gold3"
                  >
                    <span>{f.q}</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      width={18}
                      height={18}
                      className={`shrink-0 text-gold2 transition-transform duration-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-btn-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-5"
                >
                  <p className="max-w-[720px] text-[14px] leading-[1.6] text-ink2">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
