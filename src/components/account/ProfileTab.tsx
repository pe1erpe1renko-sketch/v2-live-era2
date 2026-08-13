import { useState } from "react";
import { Icon } from "@iconify/react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

const panel = "rounded-[16px] border border-rule bg-surface";
const inputBg = { backgroundColor: "var(--dark-input, #1A1A1C)" };

/** Тумблер — тот же вид, что в генераторе. */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
        checked ? "bg-gold" : "bg-rule"
      }`}
    >
      <span
        className="absolute top-[3px] h-[18px] w-[18px] rounded-full transition-all duration-200"
        style={{ left: checked ? 23 : 3, backgroundColor: checked ? "#FFFFFF" : "#71717A" }}
      />
    </button>
  );
}

type Method = {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  status: string;
  statusColor?: string;
  verified?: boolean;
  action?: string;
};

const USER_EMAIL = "user@example.com";

const METHODS: Method[] = [
  {
    id: "email",
    icon: "solar:letter-linear",
    iconColor: "var(--color-gold2)",
    title: USER_EMAIL,
    status: "основная почта · подтверждена",
    statusColor: "#4ADE80",
    verified: true,
  },
  {
    id: "telegram",
    icon: "simple-icons:telegram",
    iconColor: "#229ED9",
    title: "Telegram",
    status: "не привязан",
    action: "Привязать",
  },
  {
    id: "max",
    icon: "solar:chat-square-linear",
    iconColor: "var(--dark-ink2, #A1A1AA)",
    title: "MAX",
    status: "не привязан",
    action: "Привязать",
  },
  {
    id: "backup",
    icon: "solar:letter-opened-linear",
    iconColor: "var(--dark-ink3, #71717A)",
    title: "Резервная почта",
    status: "не указана",
    action: "Добавить",
  },
];

export function ProfileTab() {
  const [name] = useState("Пользователь");
  const [mails, setMails] = useState(true);
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <h1 className="text-[24px] font-normal text-ink">Настройки профиля</h1>

      {/* Панель 1 — имя и аватар */}
      <div className={`${panel} mt-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-start`}>
        <div className="relative h-[72px] w-[72px] shrink-0">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gold3 text-[28px] font-normal text-gold">
            {name.charAt(0).toUpperCase()}
          </div>
          <button
            type="button"
            aria-label="Изменить аватар"
            className={`absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gold ${focusRing}`}
            style={{ border: "2px solid var(--dark-panel, #232326)" }}
          >
            <Icon icon="solar:camera-linear" width={12} height={12} color="#FFFFFF" />
          </button>
        </div>

        <div className="min-w-0 flex-1 sm:ml-0">
          <div className="text-[12px] text-ink3">Имя</div>
          <div className="relative mt-2">
            <input
              defaultValue={name}
              aria-label="Имя"
              className={`h-11 w-full rounded-[6px] border border-rule px-4 pr-[86px] text-[14px] text-ink outline-none ${focusRing}`}
              style={inputBg}
            />
            <button
              type="button"
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[12px] text-ink3 transition-colors duration-200 hover:text-gold2 ${focusRing}`}
            >
              изменить
            </button>
          </div>
        </div>
      </div>

      {/* Панель 2 — способы входа */}
      <div className={`${panel} mt-4 p-6`}>
        <div className="type-label text-ink3">СПОСОБЫ ВХОДА</div>
        <div className="mt-4 flex flex-col gap-[10px]">
          {METHODS.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center gap-3 rounded-[6px] border border-rule px-4 py-[14px]"
              style={inputBg}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px]"
                style={{ backgroundColor: "#2E2E31" }}
              >
                <Icon icon={m.icon} width={18} height={18} color={m.iconColor} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] text-ink">{m.title}</span>
                <span
                  className="mt-[3px] flex items-center gap-1 text-[12px]"
                  style={{ color: m.statusColor ?? "var(--dark-ink3, #71717A)" }}
                >
                  {m.status}
                  {m.verified ? (
                    <Icon icon="solar:check-circle-bold" width={12} height={12} />
                  ) : null}
                </span>
              </span>
              {m.action ? (
                <button
                  type="button"
                  className={`shrink-0 cursor-pointer rounded-[6px] border border-rule px-4 py-2 text-[12px] text-ink transition-colors duration-200 hover:border-gold2 ${focusRing}`}
                >
                  {m.action}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-[1.45] text-ink3">
          Резервная почта или мессенджер помогут войти, если потеряете доступ к основной.
        </p>
      </div>

      {/* Панель 3 — письма */}
      <div className={`${panel} mt-4 flex items-center gap-4 px-6 py-5`}>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] text-ink">Письма о новых функциях и акциях</div>
          <div className="mt-1 text-[12px] text-ink3">не чаще двух раз в месяц</div>
        </div>
        <Toggle checked={mails} onChange={setMails} label="Письма о новых функциях и акциях" />
      </div>

      {/* Панель 4 — удаление аккаунта */}
      <div
        className="mt-4 flex flex-wrap items-center gap-4 rounded-[16px] bg-surface px-6 py-5"
        style={{ border: "1px solid #3F2A2A" }}
      >
        <div className="min-w-0 flex-1">
          <div className="text-[14px] text-ink">Удалить аккаунт и все генерации</div>
          <div className="mt-1 text-[12px] text-ink3">
            Действие необратимо. Ролики и токены восстановить будет нельзя.
          </div>
        </div>
        <button
          type="button"
          onClick={() => setConfirm(true)}
          className={`shrink-0 cursor-pointer rounded-[6px] bg-transparent px-5 py-[10px] text-[13px] transition-colors duration-200 ${focusRing} hover:bg-[rgba(232,106,106,0.08)]`}
          style={{ border: "1px solid #7F3B3B", color: "#E86A6A" }}
        >
          Удалить
        </button>
      </div>

      {/* TODO: удалить после подключения бэкенда */}
      <p className="mt-5 text-[12px] leading-[1.5] text-ink3">
        Изменение имени, привязка мессенджеров и удаление аккаунта пока не подключены — разметка
        готова, обработчики добавляются отдельно.
      </p>

      {confirm ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Удалить аккаунт?"
        >
          <div className={`${panel} w-full max-w-[420px] p-6`}>
            <h2 className="text-[18px] text-ink">Удалить аккаунт?</h2>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink2">
              Все ролики, токены и история будут удалены безвозвратно.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className={`cursor-pointer rounded-[6px] border border-rule px-5 py-[10px] text-[13px] text-ink transition-colors duration-200 hover:border-gold2 ${focusRing}`}
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className={`cursor-pointer rounded-[6px] px-5 py-[10px] text-[13px] text-white transition-opacity duration-200 hover:opacity-90 ${focusRing}`}
                style={{ backgroundColor: "#B03B3B" }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
