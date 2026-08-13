import { useState } from "react";
import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

const panel = "flex h-full flex-col rounded-[16px] border border-rule bg-surface p-6";
const btnBase =
  "inline-flex h-[44px] items-center justify-center rounded-[6px] px-6 text-[14px] transition-colors duration-200";
const solidBtn = `${btnBase} bg-gold text-white hover:bg-gold-dark`;
const ghostBtn = `${btnBase} border border-rule text-ink hover:bg-gold3`;


export type Operation = {
  id: string;
  kind: "topup" | "spend";
  title: string;
  datetime: string;
  amount: number;
};

/** Строка истории операций. Данные подключаются отдельно (база / API). */
export function OperationRow({ op }: { op: Operation }) {
  const topup = op.kind === "topup";
  return (
    <div className="flex items-center border-b border-rule py-[14px]">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px]"
        style={{ backgroundColor: topup ? "var(--color-gold3)" : "#2E2E31" }}
      >
        <Icon
          icon={topup ? "solar:arrow-down-linear" : "solar:arrow-up-linear"}
          width={16}
          height={16}
          className={topup ? "text-gold" : "text-ink3"}
        />
      </span>
      <span className="ml-3 min-w-0 flex-1">
        <span className="block truncate text-[13px] text-ink">{op.title}</span>
        <span className="block text-[11px] text-ink3">{op.datetime}</span>
      </span>
      <span className={`ml-4 text-[15px] font-normal ${topup ? "text-gold2" : "text-ink2"}`}>
        {topup ? `+${op.amount}` : `−${op.amount}`}
      </span>
    </div>
  );
}

const FILTERS = [
  { id: "all", label: "Все" },
  { id: "topup", label: "Пополнения" },
  { id: "spend", label: "Списания" },
] as const;

export function BalanceTab() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  // Данные подключаются отдельно; пока история пуста.
  const operations: Operation[] = [];
  const visible = operations.filter((o) => filter === "all" || o.kind === filter);

  return (
    <div>
      <h1 className="text-[24px] font-normal text-ink">Баланс и платежи</h1>

      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <div className={panel}>
          <p className="type-label text-ink3">Баланс</p>
          <div className="mt-3 flex items-baseline">
            <span className="text-[44px] font-light leading-none text-ink">0</span>
            <span className="ml-[10px] text-[20px] font-light text-ink2">токенов</span>
          </div>
          <p className="mt-1.5 text-[12px] text-ink3">хватит примерно на 0 роликов</p>
          <div className="mt-auto flex flex-wrap gap-[10px] pt-5">
            <AppLink href="/pricing" className={`${solidBtn} ${focusRing}`}>
              Пополнить
            </AppLink>
          </div>
        </div>

        <div className={panel}>
          <p className="type-label text-ink3">Текущий тариф</p>
          <p className="mt-3 text-[22px] font-normal text-ink">Без подписки</p>
          <p className="mt-[10px] text-[13px] leading-[1.6] text-ink2">
            Вы платите разово за пакеты токенов. Токены не сгорают, автоматических списаний нет.
            Подписка выгоднее при регулярном использовании.
          </p>
          <div className="mt-auto pt-5">
            <AppLink href="/pricing" className={`${ghostBtn} ${focusRing}`}>
              Посмотреть подписки
            </AppLink>
          </div>
        </div>

      </div>

      <div className={`mt-6 ${panel}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[16px] font-normal text-ink">История операций</h2>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-[6px] px-4 py-2 text-[13px] transition-colors duration-200 ${focusRing} ${
                  filter === f.id ? "bg-gold text-white" : "border border-rule text-ink2"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          {visible.length === 0 ? (
            <p className="p-8 text-center text-[13px] text-ink3">
              Операций пока нет. Здесь появятся пополнения и списания токенов.
            </p>
          ) : (
            visible.map((op) => <OperationRow key={op.id} op={op} />)
          )}
        </div>
      </div>
    </div>
  );
}
