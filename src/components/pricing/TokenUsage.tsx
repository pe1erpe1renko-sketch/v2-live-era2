import { SectionLabel } from "@/components/SectionLabel";

const MODELS: { name: string; cost: number; unit: string; note: string }[] = [
  { name: "Grok", cost: 9, unit: "/ 5 сек", note: "самый дешёвый, для простых движений" },
  { name: "Hailuo 2", cost: 12, unit: "/ 6 сек", note: "экономный, ролики на 6 и 10 секунд" },
  { name: "Veo 3.1", cost: 20, unit: "/ 5 сек", note: "Google, звук в комплекте" },
  { name: "Hedra", cost: 27, unit: "/ 5 сек", note: "говорящий портрет под вашу аудиозапись" },
  { name: "KLING 3.0", cost: 31, unit: "/ 5 сек", note: "держит мимику и мелкие детали" },
  {
    name: "MiniMax H3",
    cost: 36,
    unit: "/ 5 сек",
    note: "оживление фото и работа с референсами",
  },
  {
    name: "Kling 3.0 Motion Control",
    cost: 44,
    unit: "/ 5 сек",
    note: "переносит движение с вашего видео-эталона",
  },
  { name: "Seedance 2.0", cost: 62, unit: "/ 5 сек", note: "плавное движение в кадре" },
];

export function TokenUsage() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-8 pt-16 lg:px-16">
        <SectionLabel>Расход</SectionLabel>

        <h2 className="mt-4 text-[clamp(26px,3vw,38px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
          Сколько токенов стоит один ролик
        </h2>

        <p className="mt-3 max-w-[720px] text-[15px] leading-[1.6] text-ink2">
          Разные модели считают по-разному. Быстрые расходуют меньше, премиум — больше, но держат
          детали точнее. В сценариях модель подбирается под задачу сама.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((m) => (
            <article key={m.name} className="rounded-[16px] border border-rule bg-surface p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-gold3 text-[15px] text-gold">
                {m.name.charAt(0)}
              </span>
              <h3 className="mt-3 text-[15px] font-normal text-ink">{m.name}</h3>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[28px] font-light leading-none text-ink">{m.cost}</span>
                <span className="text-[12px] text-ink3">ток. {m.unit}</span>
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.5] text-ink2">{m.note}</p>
            </article>
          ))}
        </div>

        <p className="mt-4 text-[13px] leading-[1.6] text-ink3">
          Ролик на 10 секунд расходует вдвое больше — у Veo цена за ролик не зависит от длины.
          У Hailuo 2 ролик бывает на 6 и 10 секунд. У Hedra длительность задаёт звуковая дорожка. У Kling 3.0 Motion Control
          длительность задаёт видео-эталон: сколько секунд в нём, столько и в готовом ролике. Звук
          эта модель берёт оттуда же, отдельной доплаты за него нет. Звук и разрешение выше базового
          считаются по отдельной ставке. Если генерация сорвалась, токены возвращаются
          автоматически.
        </p>
      </div>
    </section>
  );
}
