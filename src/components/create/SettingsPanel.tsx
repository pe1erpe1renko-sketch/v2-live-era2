import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useCreate } from "@/components/create/CreateContext";
import { capabilitiesFor, qualitiesFor } from "@/components/create/modelCapabilities";
import { computeCost, PRICING_RULES } from "@/components/create/tokenCosts";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { AppLink } from "@/components/AppLink";
import { tokensLabel } from "@/lib/plural";

const TEXT_ONLY = "video-iz-teksta";
const darkInput = { backgroundColor: "var(--dark-input, #1a1a1c)" };

function Segmented({
  value,
  options,
  onChange,
  label,
  inline,
  disabledOptions,
  titles,
  subLabels,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
  inline?: boolean;
  disabledOptions?: string[];
  titles?: Record<string, string>;
  subLabels?: Record<string, string>;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      style={darkInput}
      className={`gap-0 rounded-[6px] border border-rule p-[3px] ${
        inline ? "inline-flex w-auto" : "flex w-full md:inline-flex md:w-auto"
      }`}
    >
      {options.map((o) => {
        const on = o === value;
        const off = disabledOptions?.includes(o);
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            aria-disabled={off || undefined}
            title={titles?.[o]}
            onClick={() => !off && onChange(o)}
            className={`rounded-[4px] px-[14px] text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
              inline ? "py-[6px]" : "flex-1 py-[10px] md:flex-none md:py-[6px]"
            } ${
              off
                ? "cursor-default text-ink3 opacity-50"
                : on
                  ? "bg-gold text-white"
                  : "text-ink2 hover:text-ink"
            }`}
          >
            {o}
            {subLabels?.[o] && (
              <span className="ml-1 text-[10px] uppercase tracking-[0.1em] opacity-70">
                {subLabels[o]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}


function Toggle({
  checked,
  onChange,
  label,
  locked,
  lockedHint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  locked?: boolean;
  lockedHint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={locked || undefined}
      aria-label={label}
      title={locked ? lockedHint : undefined}
      onClick={() => !locked && onChange(!checked)}
      className={`relative h-[24px] w-[44px] shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
        checked ? "bg-gold" : "bg-rule"
      } ${locked ? "cursor-default opacity-50" : ""}`}
    >
      <span
        className="absolute top-[3px] h-[18px] w-[18px] rounded-full transition-all duration-200"
        style={{
          left: checked ? 23 : 3,
          backgroundColor: checked ? "#FFFFFF" : "#71717A",
        }}
      />
    </button>
  );

}

function Slider({
  value,
  min,
  max,
  step,
  onChange,
  label,
  className,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  label: string;
  className?: string;
}) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      aria-label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`gold-range ${className ?? ""}`}
      style={{ ["--fill" as string]: `${pct}%` }}
    />
  );
}

function LastFrameZone({ onChange }: { onChange: (has: boolean) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    onChange(!!file);
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file, onChange]);

  if (file && url) {
    return (
      <div className="rounded-[6px] border border-rule bg-surface p-3">
        <img
          src={url}
          alt={file.name}
          className="mx-auto max-h-[140px] rounded-[6px] object-contain"
        />
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="truncate text-[12px] text-ink2">{file.name}</span>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="flex shrink-0 items-center gap-1 text-[12px] text-ink3 transition-colors hover:text-ink"
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
      className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-[6px] border border-dashed border-rule px-4 text-center transition-colors duration-200 hover:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
    >
      <Icon icon="solar:gallery-add-linear" width={22} height={22} className="text-gold2" />
      <p className="mt-2 text-[13px] text-ink">Кадр, которым закончится ролик</p>
      <p className="mt-1 text-[11px] text-ink3">необязательно · JPG или PNG до 20 МБ · +2 токена</p>
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

export function SettingsPanel() {
  const { modelSlug, model, scenarioSlug, file, audioDuration, videoFile, videoDuration } =
    useCreate();
  const { isLoggedIn } = useAuth();
  const { openAuth } = useAuthModal();
  const caps = capabilitiesFor(modelSlug);
  const dMin = caps.durationMin ?? 5;
  const dMax = caps.durationMax ?? 10;
  const dStep = caps.durationStep ?? 1;
  const needsAudio = !!caps.needsAudio;
  const noDuration = !!caps.durationLocked;
  const compact = noDuration && !needsAudio && !caps.sound && !caps.expert;
  const needsVideo = !!caps.requiresReferenceVideo;
  const videoSeconds = videoDuration ? Math.ceil(videoDuration) : null;

  // звук входит в базовую цену — тумблер показываем включённым и заблокированным
  const soundLocked = PRICING_RULES.soundIncluded.includes(modelSlug);
  const soundHint = "Эта модель всегда выдаёт видео со звуком. Доплаты за него нет";
  // цена не зависит от длительности
  const perClip = PRICING_RULES.perClip.includes(modelSlug);
  // фиксированные длительности вместо ползунка
  const durationOptions = caps.durationMultipliers
    ? Object.keys(caps.durationMultipliers)
        .map(Number)
        .sort((a, b) => a - b)
    : null;



  const [format, setFormat] = useState("9:16");
  const [duration, setDuration] = useState(dMin);
  const [quality, setQuality] = useState("720p");
  const [sound, setSound] = useState(false);
  const [expert, setExpert] = useState(false);
  const [strength, setStrength] = useState(0.5);
  const [negative, setNegative] = useState("");
  const [hasLastFrame, setHasLastFrame] = useState(false);

  // при смене модели набор настроек перестраивается под её возможности
  useEffect(() => {
    setFormat((f) =>
      caps.formats.includes(f)
        ? f
        : caps.formats.includes("9:16")
          ? "9:16"
          : (caps.formats[0] ?? "16:9"),
    );
    setQuality((q) =>
      caps.qualities.includes(q)
        ? q
        : caps.qualities.includes("720p")
          ? "720p"
          : (caps.qualities[0] ?? "720p"),
    );
    setDuration((d) => {
      const clamped = Math.min(dMax, Math.max(dMin, d));
      if (!durationOptions) return clamped;
      return durationOptions.includes(clamped) ? clamped : durationOptions[0]!;
    });
    if (!caps.sound) setSound(false);
    if (!caps.expert) setExpert(false);
  }, [caps, dMin, dMax]); // eslint-disable-line react-hooks/exhaustive-deps

  const availableQualities = qualitiesFor(caps, duration);
  const disabledQualities = caps.qualities.filter((q) => !availableQualities.includes(q));
  useEffect(() => {
    setQuality((q) => (availableQualities.includes(q) ? q : (availableQualities[0] ?? "720p")));
  }, [availableQualities.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps


  const cost = useMemo(
    () =>
      computeCost({
        model: modelSlug,
        duration: needsAudio
          ? Math.max(5, Math.ceil(audioDuration ?? 5))
          : needsVideo
            ? Math.max(5, videoSeconds ?? 5)
            : duration,
        quality,
        sound,
        format,
        lastFrame: caps.lastFrame && expert && hasLastFrame,
      }),
    [
      modelSlug,
      duration,
      needsAudio,
      audioDuration,
      needsVideo,
      videoSeconds,
      quality,
      sound,
      format,
      caps.lastFrame,
      expert,
      hasLastFrame,
    ],
  );

  const needsPhoto = scenarioSlug !== TEXT_ONLY;
  const disabled =
    (needsPhoto && !file) || (needsAudio && !audioDuration) || (needsVideo && !videoFile);

  // подпись кнопки, когда не хватает файлов для video-to-video
  const missingLabel =
    needsVideo && !file && !videoFile
      ? "Загрузите снимок и видео-эталон"
      : needsVideo && !videoFile
        ? "Загрузите видео-эталон"
        : needsVideo && !file
          ? "Загрузите снимок"
          : null;

  // TODO: заглушка — генерация появится вместе с бэкендом
  const handleGenerate = () => {};

  // общие пропсы кнопок качества: недоступные варианты видно, но выбрать нельзя
  const qualityProps = {
    options: caps.qualities,
    disabledOptions: disabledQualities,
    titles: Object.fromEntries(
      disabledQualities.map((q) => [q, "1080p доступно только для ролика на 6 секунд"]),
    ),
    subLabels: (caps.qualities.includes("480p")
      ? { "480p": "экономно" }
      : {}) as Record<string, string>,
  };

  const soundBlock =
    caps.sound || soundLocked ? (
      <div className="flex items-center gap-3" title={soundLocked ? soundHint : undefined}>
        <Toggle
          checked={soundLocked ? true : sound}
          onChange={setSound}
          label="Звук"
          locked={soundLocked}
          lockedHint={soundHint}
        />
        <div>
          <div className="text-[13px] text-ink">Звук</div>
          <div className="text-[11px] text-ink3">
            {soundLocked ? "звук включён, доплаты нет" : "дороже — считается по другой ставке"}
          </div>
        </div>
      </div>
    ) : null;

  return (

    <>
      <div
        className={`mt-4 rounded-[16px] border border-rule bg-surface ${
          compact ? "p-4" : "p-4 md:p-5"
        }`}
      >
        {compact ? (
          <>
            {/* Компактная строка: Формат | Качество */}
            <div className="@container">
            <div className="flex flex-col gap-3 @lg:flex-row @lg:items-center @lg:justify-between @lg:gap-6">
              <div className="flex flex-col gap-2 @lg:flex-row @lg:items-center @lg:gap-3">
                <span className="text-[13px] text-ink3">Формат</span>
                <Segmented
                  inline
                  value={format}
                  options={caps.formats}
                  onChange={setFormat}
                  label="Формат"
                />
              </div>

              <div
                className="hidden w-px self-stretch @lg:block"
                style={{ backgroundColor: "var(--dark-rule)" }}
              />

              <div className="flex flex-col gap-2 @lg:flex-row @lg:items-center @lg:gap-3">
                <span className="text-[13px] text-ink3">Качество</span>
                <Segmented
                  inline
                  value={quality}
                  {...qualityProps}
                  onChange={setQuality}
                  label="Качество"
                />
              </div>
            </div>
            </div>

            {noDuration && (
              <div className="mt-3 flex items-center gap-2 text-[13px]">
                <span className="text-ink3">Длительность</span>
                <span className="text-ink">
                  {videoSeconds ? `${videoSeconds} сек` : "по видео-эталону"}
                </span>
              </div>
            )}

            {soundBlock && <div className="mt-3">{soundBlock}</div>}

          </>
        ) : (
          <>
            {/* Ряд 1 */}
            <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:gap-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                <span className="text-[13px] text-ink3">Формат</span>
                <Segmented value={format} options={caps.formats} onChange={setFormat} label="Формат" />
              </div>

              {needsAudio ? (
                <p className="text-[13px] text-ink2">
                  Длительность ролика равна длине звуковой дорожки
                </p>
              ) : durationOptions ? (
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                  <span className="text-[13px] text-ink3">Длительность</span>
                  <Segmented
                    value={String(duration)}
                    options={durationOptions.map((d) => `${d} сек`)}
                    onChange={(v) => setDuration(parseInt(v, 10))}
                    label="Длительность"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-ink3">Длительность</span>
                    <span className="shrink-0 whitespace-nowrap md:hidden">
                      <span className="text-[14px] font-normal text-ink">{duration}</span>{" "}
                      <span className="text-[12px] text-ink3">
                        / {dMin}–{dMax} сек
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <Slider
                        label="Длительность"
                        value={duration}
                        min={dMin}
                        max={dMax}
                        step={dStep}
                        onChange={setDuration}
                        className="w-full md:w-[160px]"
                      />
                      <span className="hidden shrink-0 whitespace-nowrap md:inline">
                        <span className="text-[14px] font-normal text-ink">{duration}</span>{" "}
                        <span className="text-[12px] text-ink3">
                          / {dMin}–{dMax} сек
                        </span>
                      </span>
                    </div>
                    {perClip && (
                      <span className="text-[11px] text-ink3">
                        цена не зависит от длины ролика
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="my-4 h-px w-full bg-rule" />

            {/* Ряд 2 */}
            <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:gap-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                <span className="text-[13px] text-ink3">Качество</span>
                <Segmented
                  value={quality}
                  {...qualityProps}
                  onChange={setQuality}
                  label="Качество"
                />
              </div>

              {soundBlock}


              {caps.expert && (
                <div className="flex items-center gap-3 md:ml-auto">
                  <Toggle checked={expert} onChange={setExpert} label="Эксперт" />
                  <span className="text-[13px] text-ink">Эксперт</span>
                </div>
              )}
            </div>
          </>
        )}


        {/* Строка-подсказка */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px] text-ink3">
          <span>
            {caps.expert && !expert &&
              "Тумблер «Эксперт» открывает точность промпта, последний кадр и негативный промпт"}
          </span>
          <span className="ml-auto">
            на движке <span className="text-gold2">{model?.name}</span>
          </span>
        </div>

        {/* Эксперт-настройки */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-slow ${
            expert && caps.expert ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-5 border-t border-rule pt-5">
              <div className="type-label">ЭКСПЕРТ-НАСТРОЙКИ</div>

              {caps.promptStrength && (
                <div className="mt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] text-ink2">Точность следования промпту</span>
                    <span className="text-[14px] font-normal text-ink">{strength.toFixed(2)}</span>
                  </div>
                  <div className="mt-2.5">
                    <Slider
                      label="Точность следования промпту"
                      value={strength}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={setStrength}
                      className="w-full"
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-[1.4] text-ink3">
                    Ниже — движения живее, но модель может уйти от описания. Выше — точнее по
                    тексту, но пластика становится механической.
                  </p>
                </div>
              )}

              {caps.negativePrompt && (
                <div className="mt-5">
                  <div className="text-[13px] text-ink2">Негативный промпт</div>
                  <textarea
                    value={negative}
                    onChange={(e) => setNegative(e.target.value)}
                    placeholder="чего в кадре быть не должно: искажения лица, лишние руки, текст"
                    style={darkInput}
                    className="mt-2 min-h-[56px] w-full resize-y rounded-[6px] border border-rule p-3 text-[13px] text-ink outline-none placeholder:text-ink3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
                  />
                </div>
              )}

              {caps.lastFrame && (
                <div className="mt-5">
                  <div className="mb-2 text-[13px] text-ink2">Последний кадр</div>
                  <LastFrameZone onChange={setHasLastFrame} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка генерации */}
      <div className="sticky-cta mt-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => (isLoggedIn ? handleGenerate() : openAuth("login"))}
          className={`h-[52px] w-full rounded-[6px] text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:h-[56px] md:text-[16px] ${
            disabled
              ? "cursor-not-allowed bg-rule text-ink3"
              : "cursor-pointer bg-gold text-white hover:bg-gold-dark"
          }`}
        >
          {!isLoggedIn
            ? "Войти и создать видео"
            : missingLabel
              ? missingLabel
              : `Сгенерировать · ${tokensLabel(cost)}`}
        </button>

        <p className="mt-2 text-center text-[12px] text-ink3 md:mt-2.5">
          {disabled ? (
            needsVideo ? (
              "Нужны два файла: снимок и видео-эталон"
            ) : needsAudio && !audioDuration ? (
              "Загрузите звук, чтобы продолжить"
            ) : (
              "Загрузите снимок, чтобы продолжить"
            )
          ) : isLoggedIn ? (
            <>
              Баланс: {tokensLabel(0)} ·{" "}
              <AppLink href="/account?tab=balance" className="text-gold2">
                пополнить
              </AppLink>
            </>
          ) : (
            "Первая генерация бесплатно — после входа"
          )}
        </p>
      </div>
    </>
  );
}
