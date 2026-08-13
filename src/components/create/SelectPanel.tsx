import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";
import { MODELS, SCENARIOS } from "@/components/create/data";
import { useCreate } from "@/components/create/CreateContext";

const clamp2 = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export function SelectPanel() {
  const [mode, setMode] = useState<"scenario" | "model">("scenario");
  const [query, setQuery] = useState("");
  const {
    scenarioSlug: scenario,
    setScenarioSlug: setScenario,
    modelSlug: model,
    setModelSlug: setModel,
  } = useCreate();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("scenario");
    const m = params.get("model");
    if (s && SCENARIOS.some((x) => x.slug === s)) {
      setScenario(s);
      setMode("scenario");
    } else if (m && MODELS.some((x) => x.slug === m)) {
      setModel(m);
      setMode("model");
    }
  }, []);

  useEffect(() => {
    const target = mode === "scenario" ? scenario : model;
    if (!target) return;
    const el = listRef.current?.querySelector(`[data-slug="${target}"]`);
    el?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const q = query.trim().toLowerCase();
  const scenarios = useMemo(
    () => SCENARIOS.filter((s) => s.title.toLowerCase().includes(q)),
    [q],
  );
  const models = useMemo(() => MODELS.filter((m) => m.name.toLowerCase().includes(q)), [q]);

  const empty = mode === "scenario" ? scenarios.length === 0 : models.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col pt-5">
      <div className="px-4">
        <div className="flex rounded-full border border-rule bg-[var(--dark-input,#1a1a1c)] p-1">
          {(["scenario", "model"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setQuery("");
              }}
              className={`w-1/2 rounded-full py-2 text-[13px] transition-colors ${
                mode === m
                  ? "bg-gold text-white"
                  : "bg-transparent text-ink2 hover:text-ink"
              }`}
            >
              {m === "scenario" ? "Сценарии" : "Нейросети"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 px-4">
        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            width={16}
            height={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink3"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === "scenario" ? "Найти сценарий…" : "Найти нейросеть…"}
            className="h-10 w-full rounded-[6px] border border-rule bg-[var(--dark-input,#1a1a1c)] pl-9 pr-3 text-[13px] text-ink placeholder:text-ink3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          />
        </div>
      </div>

      <div ref={listRef} className="mt-4 min-h-0 flex-1 overflow-y-auto px-4 pb-4 thin-scroll">
        {empty && <p className="text-center text-[13px] text-ink3">Ничего не нашлось</p>}

        {mode === "scenario" && !empty && (
          <div className="grid grid-cols-2 gap-2">
            {scenarios.map((s) => {
              const on = scenario === s.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  data-slug={s.slug}
                  onClick={() => setScenario(s.slug)}
                  style={on ? { boxShadow: "0 0 0 4px rgba(176,141,87,0.15)" } : undefined}
                  className={`group cursor-pointer overflow-hidden rounded-[6px] text-left transition-[opacity,filter] duration-200 ease-slow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    on
                      ? "opacity-100"
                      : "opacity-55 [filter:grayscale(0.3)] hover:opacity-100 hover:[filter:grayscale(0)]"
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-[6px] ${
                      on ? "border-2 border-gold2" : ""
                    }`}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 backdrop-blur-[8px]">
                      <Icon icon="solar:play-linear" width={10} height={10} className="text-white" />
                    </span>
                    {on && (
                      <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold">
                        <Icon icon="solar:check-read-linear" width={12} height={12} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p
                    style={clamp2}
                    className={`mt-[5px] text-[11px] leading-[1.3] ${on ? "text-ink font-medium" : "text-ink2"}`}
                  >
                    {s.title}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {mode === "model" && !empty && (
          <div className="flex flex-col gap-2">
            {models.map((m) => {
              const on = model === m.slug;
              return (
                <button
                  key={m.slug}
                  type="button"
                  data-slug={m.slug}
                  onClick={() => setModel(m.slug)}
                  style={on ? { backgroundColor: "#2A2620" } : undefined}
                  className={`relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-[6px] border p-3 text-left transition duration-200 ease-slow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    on
                      ? "border-gold2 opacity-100"
                      : "border-rule bg-surface opacity-70 hover:border-[#3F3F46] hover:opacity-100"
                  }`}
                >
                  {on && (
                    <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-gold" aria-hidden="true" />
                  )}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[14px] font-normal ${
                      on ? "bg-gold text-white" : "bg-gold3 text-gold"
                    }`}
                  >
                    {m.letter}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[13px] ${on ? "font-medium text-ink" : "text-ink"}`}>
                      {m.name}
                    </span>
                    <span style={clamp2} className="mt-0.5 block text-[11px] leading-[1.35] text-ink3">
                      {m.note}
                    </span>
                  </span>
                  {on && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold2" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-rule p-4">
        <AppLink
          href="/restore"
          className="block rounded-[6px] border border-rule bg-surface px-[14px] py-3 transition-colors hover:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          <span className="block text-[12px] text-ink2">Повреждённый снимок?</span>
          <span className="mt-1 block text-[12px] text-gold">Сначала реставрация →</span>
        </AppLink>
      </div>
    </div>
  );
}
