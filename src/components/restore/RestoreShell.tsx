import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { computeRestoreCost } from "@/components/create/tokenCosts";
import {
  RESTORE_MODEL,
  RESTORE_MAX,
  RESTORE_DEFAULT_PROMPT,
  RESTORE_CUSTOM_PLACEHOLDER,
} from "@/components/restore/config";

const darkInput = { backgroundColor: "var(--dark-input, #1a1a1c)" };

function Segmented({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      style={darkInput}
      className="inline-flex rounded-[6px] border border-rule p-[3px]"
    >
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`rounded-[4px] px-[14px] py-[6px] text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
              on ? "bg-gold text-white" : "text-ink2 hover:text-ink"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function UploadZone({ file, setFile }: { file: File | null; setFile: (f: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (file && url) {
    return (
      <div className="mt-4 rounded-[16px] border border-rule bg-surface p-4">
        <img
          src={url}
          alt={file.name}
          className="mx-auto max-h-[240px] rounded-[6px] object-contain"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="truncate text-[12px] text-ink2">{file.name}</span>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="flex shrink-0 items-center gap-1 text-[12px] text-ink3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          >
            <Icon icon="solar:trash-bin-minimalistic-linear" width={14} height={14} />
            убрать
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
      }}
      style={drag ? { backgroundColor: "rgba(176,141,87,0.06)" } : undefined}
      className={`mt-4 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed px-5 text-center transition-colors duration-200 hover:border-gold2 hover:bg-[rgba(176,141,87,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
        drag ? "border-gold2" : "border-rule"
      }`}
    >
      <Icon icon="solar:camera-linear" width={28} height={28} className="text-gold2" />
      <p className="mt-3 text-[15px] text-ink">Загрузите повреждённый снимок</p>
      <p className="mt-1.5 text-[13px] text-ink3">
        скан или фотография отпечатка · JPG, PNG до 20 МБ
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function HistoryPanel() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex min-h-full flex-col px-5 pb-5 pt-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-normal text-ink">История</h2>
        <AppLink
          href="/account"
          className="text-[12px] text-ink3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          все →
        </AppLink>
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-ink2">
        {isLoggedIn
          ? "Восстановленные снимки появятся здесь."
          : "Снимки появятся здесь после входа."}
      </p>

      <div className="mt-8 rounded-[16px] bg-surface p-4 lg:mt-auto">
        <Icon icon="solar:lightbulb-linear" width={16} height={16} className="text-gold2" />
        <p className="mt-2 text-[12px] leading-[1.45] text-ink2">
          Восстановленный снимок можно сразу отправить в генератор — он подставится как исходник.
        </p>
      </div>
    </div>
  );
}

function RestoreWorkspace() {
  const { isLoggedIn } = useAuth();
  const { openAuth } = useAuthModal();
  const [file, setFile] = useState<File | null>(null);
  const [tab, setTab] = useState<"universal" | "custom">("universal");
  const [universal, setUniversal] = useState(RESTORE_DEFAULT_PROMPT);
  const [custom, setCustom] = useState("");
  const [strength, setStrength] = useState(0.6);
  const [resolution, setResolution] = useState("2x");
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const value = tab === "universal" ? universal : custom;

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 100), 220)}px`;
  }, [value, tab]);

  const cost = computeRestoreCost(resolution);
  const strengthPct = strength * 100;

  return (
    <div className="mx-auto w-full max-w-[760px] p-5">
      {/* режим */}
      <div className="flex items-center gap-3 rounded-[16px] border border-rule bg-surface px-4 py-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-gold3">
          <Icon icon="solar:magic-stick-3-linear" width={20} height={20} className="text-gold" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-normal text-ink">Реставрация снимка</p>
          <p className="mt-0.5 text-[12px] text-ink3">
            царапины, заломы и выцветание · <span className="text-gold2">{RESTORE_MODEL}</span>
          </p>
        </div>
      </div>

      <UploadZone file={file} setFile={setFile} />

      {/* промпт */}
      <div className="mt-4 rounded-[16px] border border-rule bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div
            style={darkInput}
            className="inline-flex rounded-[6px] border border-rule p-[3px]"
            role="tablist"
            aria-label="Режим промпта"
          >
            {(
              [
                ["universal", "Универсальный"],
                ["custom", "Свой промпт"],
              ] as const
            ).map(([id, label]) => {
              const on = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(id)}
                  className={`rounded-[4px] px-4 py-2 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    on ? "bg-gold text-white" : "text-ink2 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <span
            className={`shrink-0 text-[11px] ${value.length >= RESTORE_MAX - 50 ? "text-gold2" : "text-ink3"}`}
          >
            {value.length} / {RESTORE_MAX}
          </span>
        </div>

        <textarea
          ref={taRef}
          value={value}
          maxLength={RESTORE_MAX}
          onChange={(e) =>
            tab === "universal" ? setUniversal(e.target.value) : setCustom(e.target.value)
          }
          placeholder={tab === "custom" ? RESTORE_CUSTOM_PLACEHOLDER : undefined}
          style={darkInput}
          className="mt-4 min-h-[100px] max-h-[220px] w-full resize-none rounded-[6px] border border-rule p-3.5 text-[14px] leading-[1.6] text-ink outline-none placeholder:text-ink3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        />

        {tab === "universal" && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-ink3">Текст можно править под свой снимок</span>
            {universal !== RESTORE_DEFAULT_PROMPT && (
              <button
                type="button"
                onClick={() => setUniversal(RESTORE_DEFAULT_PROMPT)}
                className="text-[12px] text-gold2 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
              >
                вернуть исходный
              </button>
            )}
          </div>
        )}
      </div>

      {/* настройки */}
      <div className="mt-4 rounded-[16px] border border-rule bg-surface p-5">
        <div className="flex flex-col gap-8 sm:flex-row">
          <div>
            <p className="text-[13px] text-ink3">Сила обработки</p>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                aria-label="Сила обработки"
                min={0}
                max={1}
                step={0.05}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="gold-range w-[180px] max-w-full"
                style={{ ["--fill" as string]: `${strengthPct}%` }}
              />
              <span className="text-[14px] text-ink">{strength.toFixed(2)}</span>
            </div>
            <p className="mt-2 max-w-[280px] text-[11px] leading-[1.5] text-ink3">
              Ниже — бережнее к оригиналу. Выше — чище результат, но может уйти детализация.
            </p>
          </div>

          <div>
            <p className="text-[13px] text-ink3">Разрешение на выходе</p>
            <div className="mt-2">
              <Segmented
                label="Разрешение на выходе"
                value={resolution}
                options={["1x", "2x", "4x"]}
                onChange={setResolution}
              />
            </div>
          </div>
        </div>
      </div>

      {/* кнопка */}
      <div className="mt-4">
        <button
          type="button"
          disabled={isLoggedIn && !file}
          // TODO: заглушка — запуск реставрации появится вместе с бэкендом
          onClick={() => {
            if (!isLoggedIn) openAuth("login");
          }}
          className={`h-[56px] w-full rounded-[6px] text-[16px] transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
            isLoggedIn && !file
              ? "cursor-not-allowed border border-rule text-ink3"
              : "cursor-pointer bg-gold text-white hover:opacity-90"
          }`}
        >
          {isLoggedIn ? `Восстановить · ${cost} токенов` : "Войти и восстановить снимок"}
        </button>

        <p className="mt-2 text-center text-[12px] text-ink3">
          {!isLoggedIn ? (
            "Первая реставрация бесплатно — после входа"
          ) : !file ? (
            "Загрузите снимок, чтобы продолжить"
          ) : (
            <>
              Баланс: 0 токенов ·{" "}
              <AppLink
                href="/account?tab=balance"
                className="text-gold2 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
              >
                пополнить
              </AppLink>
            </>
          )}
        </p>
      </div>

      <p className="mt-5 text-center text-[13px] text-ink3">
        Снимок уже в порядке?{" "}
        <AppLink
          href="/create"
          className="text-gold2 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          Сразу оживить →
        </AppLink>
      </p>
    </div>
  );
}

export function RestoreShell() {
  return (
    <div className="flex w-full flex-col lg:h-[calc(100svh-72px)] lg:flex-row lg:overflow-hidden">
      <section className="min-w-0 flex-1 overflow-y-auto thin-scroll">
        <RestoreWorkspace />
      </section>
      <aside className="w-full shrink-0 border-t border-rule lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-t-0 thin-scroll">
        <HistoryPanel />
      </aside>
    </div>
  );
}
