import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";

const REVIEWS = [
  {
    letter: "М",
    name: "Марина, Нижний Новгород",
    category: "Семейный архив",
    text: "Отсканировала единственную карточку бабушки, 1958 год, с заломом через всё лицо. Ждала, что черты поплывут, но получилось дыхание и моргание, а лицо осталось её. Царапины сервис убрал сам, отдельно я об этом не просила.",
  },
  {
    letter: "Д",
    name: "Дмитрий, Екатеринбург",
    category: "Подарок",
    text: "Делал ролик отцу на семидесятилетие из студенческого снимка. С первого раза он только моргал, поменял сценарий на поворот головы — и вышло то, что нужно. За неудачную попытку токены вернулись автоматически.",
  },
  {
    letter: "А",
    name: "Анна, Казань",
    category: "Лента",
    text: "Беру для сторис: кадры из отпуска оживают за пару минут, вертикальный формат сразу нужный, водяного знака нет. На групповых снимках лица на заднем плане иногда плывут, поэтому выбираю те, где я крупно.",
  },
  {
    letter: "С",
    name: "Сергей, Псков",
    category: "Рисунки",
    text: "Оживил дракона, которого сын рисовал неделю. Боялся, что нейросеть перерисует по-своему и получится мультик из интернета, но кривые пропорции и линии остались его. Ребёнок пересматривал раз двадцать.",
  },
];

export function Reviews() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-8 py-8 md:py-16 lg:px-16">
        <SectionLabel>Отзывы</SectionLabel>

        <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Что говорят те, кто уже оживлял снимки
        </h2>

        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              tabIndex={0}
              className="flex h-full flex-col rounded-[16px] border border-rule bg-surface p-6 shadow-card transition-colors duration-300 hover:border-gold2"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-gold3 text-[15px] font-normal text-gold">
                  {r.letter}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-normal text-ink">{r.name}</div>
                  <div className="type-label mt-0.5 text-[10px]">{r.category}</div>
                </div>
                <div className="flex shrink-0 gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      width={13}
                      height={13}
                      className="text-gold2"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-[1.6] text-ink2">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
