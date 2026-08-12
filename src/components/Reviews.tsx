import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import avatarMarina from "@/assets/avatar-marina.jpg";
import avatarDmitry from "@/assets/avatar-dmitry.jpg";
import avatarAnna from "@/assets/avatar-anna.jpg";
import avatarSergey from "@/assets/avatar-sergey.jpg";

const REVIEWS = [
  {
    avatar: avatarMarina,
    name: "Марина, Нижний Новгород",
    category: "Семейный архив",
    text: "Отсканировала единственную карточку бабушки, 1958 год, с заломом через всё лицо. Ждала, что черты поплывут, но получилось дыхание и моргание, а лицо осталось её. Царапины сервис убрал сам, отдельно я об этом не просила.",
  },
  {
    avatar: avatarDmitry,
    name: "Дмитрий, Екатеринбург",
    category: "Подарок",
    text: "Делал ролик отцу на семидесятилетие из студенческого снимка. С первого раза он только моргал, поменял сценарий на поворот головы — и вышло то, что нужно. За неудачную попытку токены вернулись автоматически.",
  },
  {
    avatar: avatarAnna,
    name: "Анна, Казань",
    category: "Лента",
    text: "Беру для сторис: кадры из отпуска оживают за пару минут, вертикальный формат сразу нужный, водяного знака нет. На групповых снимках лица на заднем плане иногда плывут, поэтому выбираю те, где я крупно.",
  },
  {
    avatar: avatarSergey,
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
            <a
              key={r.name}
              href="#"
              className="flex h-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold2 flex-col rounded-[16px] border border-rule bg-surface p-6 shadow-card transition-colors duration-200 hover:border-gold2"
            >
              <div className="flex items-start gap-3">
                <img
                  src={r.avatar}
                  alt=""
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full border border-rule object-cover"
                />
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
