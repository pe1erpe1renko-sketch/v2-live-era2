import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

export type Generation = {
  id: string;
  preview: string;
  duration: string;
  scenario: string;
  model: string;
  date: string;
};

/** Карточка ролика. Данные подключаются отдельно (база / API). */
export function GenerationCard({ item }: { item: Generation }) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-rule bg-surface">
      <div className="relative aspect-[9/16] w-full">
        <img src={item.preview} alt={item.scenario} className="h-full w-full object-cover" />
        <span className="absolute right-2 top-2 rounded-[4px] bg-black/60 px-2 py-[3px] text-[11px] text-white">
          {item.duration}
        </span>
        <button
          type="button"
          aria-label="Воспроизвести"
          className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-[8px] ${focusRing}`}
        >
          <Icon icon="solar:play-linear" width={16} height={16} className="text-white" />
        </button>
      </div>
      <div className="p-[14px]">
        <p className="text-[13px] text-ink">{item.scenario}</p>
        <p className="type-label mt-1 text-[10px] text-ink3">
          {item.model} · {item.date}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            className={`flex items-center gap-1.5 text-[12px] text-ink2 transition-colors duration-200 hover:text-gold2 ${focusRing}`}
          >
            <Icon icon="solar:download-minimalistic-linear" width={14} height={14} />
            Скачать
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 text-[12px] text-ink2 transition-colors duration-200 hover:text-gold2 ${focusRing}`}
          >
            <Icon icon="solar:refresh-linear" width={14} height={14} />
            Продолжить
          </button>
        </div>
      </div>
    </article>
  );
}

export function GenerationsTab() {
  // Данные подключаются отдельно; пока список пуст.
  const items: Generation[] = [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[24px] font-normal text-ink">Мои генерации</h1>
        <AppLink
          href="/create"
          className={`rounded-[6px] bg-gold px-6 py-3 text-[14px] text-white transition-colors duration-200 hover:bg-gold-dark ${focusRing}`}
        >
          Создать видео
        </AppLink>
      </div>

      <div className="mt-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center rounded-[16px] border border-rule bg-surface p-12 text-center">
            <Icon icon="solar:gallery-linear" width={32} height={32} className="text-ink3" />
            <p className="mt-4 text-[15px] text-ink">Пока пусто</p>
            <p className="mt-2 max-w-[420px] text-[13px] leading-[1.6] text-ink2">
              Готовые ролики появляются здесь сразу после генерации и не удаляются — можно
              вернуться и скачать в любой момент.
            </p>
            <AppLink
              href="/create"
              className={`mt-6 rounded-[6px] border border-rule px-6 py-3 text-[14px] text-ink transition-colors duration-200 hover:bg-gold3 ${focusRing}`}
            >
              Создать первый ролик
            </AppLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <GenerationCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
