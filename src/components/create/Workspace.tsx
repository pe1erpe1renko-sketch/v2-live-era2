import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useCreate } from "@/components/create/CreateContext";
import { SettingsPanel } from "@/components/create/SettingsPanel";
import {
  MOTION_PRESETS,
  MOTION_PRESET_IDS,
  applyPresetText,
  type MotionPresetId,
} from "@/components/create/motionPresets";


const DRAW_SCENARIOS = new Set(["detskiy-risunok", "illyustratsiya", "kartina"]);
const TEXT_ONLY = "video-iz-teksta";
const FACE_SCENARIOS = new Set(["portret", "staroe-foto", "foto-9-maya"]);
const MAX = 500;

const PRESETS = [
  { id: "light", label: "Лёгкое оживление" },
  { id: "live", label: "Живое движение" },
  { id: "multi", label: "Несколько ключевых движений" },
];

function placeholderFor(slug: string | null) {
  if (slug === TEXT_ONLY) return "Опишите сцену целиком: кто в кадре, что происходит, какой свет";
  if (slug && FACE_SCENARIOS.has(slug)) return "например: лёгкая улыбка, поворот головы";
  return "Опишите движение: что происходит в кадре";
}

function ScenarioBar() {
  const { scenario, model, setScenarioSlug } = useCreate();
  if (!scenario) return null;
  return (
    <div className="flex flex-col gap-2 rounded-[16px] border border-rule bg-surface px-4 py-3 md:flex-row md:items-center md:gap-3">
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center">
        <img
          src={scenario.img}
          alt={scenario.title}
          className="h-9 w-12 shrink-0 rounded-[6px] object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-start gap-2">
            <Icon
              icon={scenario.icon}
              width={16}
              height={16}
              className="mt-1 shrink-0 text-gold2"
            />
            <span className="text-[15px] font-normal leading-[1.3] text-ink md:truncate">
              {scenario.title}
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-[1.4] text-ink3 md:truncate">
            {scenario.note}
            {model && (
              <>
                {" · "}
                <span className="text-gold2">{model.name}</span>
              </>
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setScenarioSlug(null)}
        className="flex shrink-0 items-center gap-1 self-end text-[12px] text-ink3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:self-center"
      >
        сбросить
        <Icon icon="solar:close-circle-linear" width={14} height={14} />
      </button>
    </div>
  );
}

function UploadZone() {
  const { scenarioSlug, file, setFile } = useCreate();
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

  const isDraw = scenarioSlug ? DRAW_SCENARIOS.has(scenarioSlug) : false;

  if (file && url) {
    return (
      <div className="mt-4 rounded-[16px] border border-rule bg-surface p-4">
        <img
          src={url}
          alt={file.name}
          className="mx-auto max-h-[220px] rounded-[6px] object-contain"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
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
      className={`mt-4 flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed px-4 text-center transition-colors duration-200 hover:border-gold2 hover:bg-[rgba(176,141,87,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:min-h-[220px] md:px-5 ${
        drag ? "border-gold2" : "border-rule"
      }`}
    >
      <Icon icon="solar:camera-linear" className="h-6 w-6 text-gold2 md:h-7 md:w-7" />
      <p className="mt-3 text-[14px] text-ink md:text-[15px]">
        {isDraw ? "Загрузите рисунок" : "Загрузите фотографию"}
      </p>
      <p className="mt-1.5 text-[12px] text-ink3 md:text-[13px]">
        снимок с телефона или скан · JPG, PNG до 20 МБ
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

function PromptPanel() {
  const { scenarioSlug } = useCreate();
  const [value, setValue] = useState("");
  const [preset, setPreset] = useState<MotionPresetId | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const near = value.length >= 450;
  const disabled = value.trim().length === 0;

  const onPreset = (id: MotionPresetId) => {
    const oldText = preset ? MOTION_PRESETS[preset].text : "";
    const next = preset === id ? "" : MOTION_PRESETS[id].text;
    setValue(applyPresetText(value, oldText, next).slice(0, MAX));
    setPreset(next ? id : null);
  };

  const onManualChange = (next: string) => {
    setValue(next);
    // пресет снимается, если его текст стёрли вручную
    if (preset && !next.includes(MOTION_PRESETS[preset].text)) setPreset(null);
  };

  return (
    <div className="mt-4 rounded-[16px] border border-rule bg-surface p-5">
      <div className="flex items-start gap-4">
        <textarea
          ref={taRef}
          value={value}
          maxLength={MAX}
          onChange={(e) => onManualChange(e.target.value)}
          placeholder={placeholderFor(scenarioSlug)}
          className="min-h-[72px] max-h-[200px] w-full flex-1 resize-none border-0 bg-transparent text-[14px] leading-[1.6] text-ink outline-none placeholder:text-ink3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        />
        <span className={`shrink-0 text-[11px] ${near ? "text-gold2" : "text-ink3"}`}>
          {value.length} / {MAX}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {MOTION_PRESET_IDS.map((id) => {
          const on = preset === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => onPreset(id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                on
                  ? "border-0 bg-gold3 text-gold"
                  : "border border-rule text-ink2 hover:border-[#3F3F46] hover:text-ink"
              }`}
            >
              {MOTION_PRESETS[id].label}
            </button>
          );
        })}


        <button
          type="button"
          disabled={disabled}
          // TODO: заглушка — улучшение промпта появится вместе с бэкендом
          onClick={() => {}}
          className={`ml-auto flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
            disabled
              ? "cursor-not-allowed border-rule text-ink3"
              : "cursor-pointer border-gold2 text-gold hover:bg-[rgba(176,141,87,0.1)]"
          }`}
        >
          <Icon icon="solar:magic-stick-3-linear" width={14} height={14} />
          Улучшить промпт · 1 токен
        </button>
      </div>
    </div>
  );
}

export function Workspace() {
  const { scenarioSlug } = useCreate();
  return (
    <div className="mx-auto w-full max-w-[860px] px-4 pb-8 pt-5 sm:px-5">
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-slow ${
          scenarioSlug ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ScenarioBar />
        </div>
      </div>

      {scenarioSlug !== TEXT_ONLY && <UploadZone />}
      <PromptPanel />
      <SettingsPanel />
    </div>
  );
}
