import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useCreate } from "@/components/create/CreateContext";

const darkInput = { backgroundColor: "var(--dark-input, #1a1a1c)" };

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Player({
  url,
  name,
  duration,
  onRemove,
  maxSeconds,
  extra,
}: {
  url: string;
  name: string;
  duration: number;
  onRemove: () => void;
  maxSeconds: number;
  extra?: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <div className="mt-4 rounded-[6px] border border-rule p-[14px]" style={darkInput}>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false);
          setTime(0);
        }}
        className="hidden"
      />

      <div className="flex items-start gap-[10px]">
        <Icon icon="solar:music-note-linear" width={18} height={18} className="mt-0.5 shrink-0 text-gold2" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] text-ink">{name}</div>
          <div className="mt-0.5 text-[11px] text-ink3">{fmt(duration)}</div>
        </div>
        <button
          type="button"
          aria-label="Удалить дорожку"
          onClick={onRemove}
          className="shrink-0 text-ink3 transition-colors hover:text-[#E86A6A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          <Icon icon="solar:trash-bin-minimalistic-linear" width={16} height={16} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          aria-label={playing ? "Пауза" : "Воспроизвести"}
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            if (playing) {
              a.pause();
              setPlaying(false);
            } else {
              void a.play();
              setPlaying(true);
            }
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule text-gold transition-colors hover:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
        >
          <Icon icon={playing ? "solar:pause-linear" : "solar:play-linear"} width={14} height={14} />
        </button>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-rule">
          <div className="h-full rounded-full bg-gold2" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-[11px] text-ink3">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>

      {extra}

      {duration > maxSeconds && (
        <p className="mt-2 text-[12px]" style={{ color: "#E86A6A" }}>
          Дорожка длиннее {maxSeconds} секунд — будет использовано начало записи
        </p>
      )}
    </div>
  );
}

export function AudioPanel({ maxSeconds = 15 }: { maxSeconds?: number }) {
  const { setAudioDuration } = useCreate();
  const [tab, setTab] = useState<"upload" | "record">("upload");
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [drag, setDrag] = useState(false);
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [micError, setMicError] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setAudioDuration(url ? duration : null);
  }, [url, duration, setAudioDuration]);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  const accept = (f: File) => {
    const u = URL.createObjectURL(f);
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return u;
    });
    setName(f.name);
    const probe = new Audio(u);
    probe.addEventListener("loadedmetadata", () => {
      setDuration(Number.isFinite(probe.duration) ? probe.duration : 0);
    });
  };

  const reset = () => {
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setName("");
    setDuration(0);
    setAudioDuration(null);
  };

  const startRecording = async () => {
    setMicError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        const file = new File([blob], "Запись с микрофона", { type: blob.type });
        accept(file);
        setDuration(elapsedRef.current);
      };
      recorderRef.current = rec;
      elapsedRef.current = 0;
      setElapsed(0);
      rec.start();
      setRecording(true);
      timerRef.current = setInterval(() => {
        elapsedRef.current += 1;
        setElapsed(elapsedRef.current);
      }, 1000);
    } catch {
      setMicError(true);
    }
  };

  const elapsedRef = useRef(0);

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    recorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div
      className="mt-4 rounded-[16px] border border-rule p-5"
      style={{ backgroundColor: "var(--dark-panel, #151517)" }}
    >
      <div className="type-label text-ink3">ЗВУКОВАЯ ДОРОЖКА</div>

      <div className="mt-4 flex rounded-[6px] border border-rule p-[3px]" style={darkInput}>
        {(["upload", "record"] as const).map((t) => {
          const on = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`w-1/2 rounded-[4px] px-4 py-2 text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                on ? "bg-gold text-white" : "text-ink2 hover:text-ink"
              }`}
            >
              {t === "upload" ? "Загрузить файл" : "Записать голос"}
            </button>
          );
        })}
      </div>

      {tab === "upload" && (
        <div className="mt-4">
          {url ? (
            <Player
              url={url}
              name={name}
              duration={duration}
              onRemove={reset}
              maxSeconds={maxSeconds}
            />
          ) : (
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
                if (f) accept(f);
              }}
              style={drag ? { backgroundColor: "rgba(176,141,87,0.06)" } : undefined}
              className={`flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-[6px] border border-dashed px-4 text-center transition-colors duration-200 hover:border-gold2 hover:bg-[rgba(176,141,87,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                drag ? "border-gold2" : "border-rule"
              }`}
            >
              <Icon icon="solar:music-note-linear" width={24} height={24} className="text-gold2" />
              <p className="mt-[10px] text-[14px] text-ink">Перетащите аудио или выберите файл</p>
              <p className="mt-1 text-[12px] text-ink3">MP3, WAV или M4A · до {maxSeconds} секунд</p>
              <input
                ref={inputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) accept(f);
                  e.target.value = "";
                }}
              />
            </div>
          )}
        </div>
      )}

      {tab === "record" && (
        <div className="mt-4">
          {url && !recording ? (
            <Player
              url={url}
              name={name}
              duration={duration}
              onRemove={reset}
              maxSeconds={maxSeconds}
              extra={
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    void startRecording();
                  }}
                  className="mt-3 text-[12px] text-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
                >
                  Записать заново
                </button>
              }
            />
          ) : (
            <div className="flex flex-col items-center py-2">
              <button
                type="button"
                aria-label={recording ? "Остановить запись" : "Начать запись"}
                onClick={() => (recording ? stopRecording() : void startRecording())}
                style={{ backgroundColor: recording ? "#C0392B" : undefined }}
                className={`relative flex h-16 w-16 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  recording ? "" : "bg-gold"
                }`}
              >
                {recording && (
                  <span
                    className="absolute inset-0 animate-ping rounded-full"
                    style={{ backgroundColor: "rgba(192,57,43,0.45)" }}
                    aria-hidden="true"
                  />
                )}
                <Icon
                  icon={recording ? "solar:stop-linear" : "solar:microphone-linear"}
                  width={26}
                  height={26}
                  className="relative text-white"
                />
              </button>

              {recording ? (
                <>
                  <div className="mt-3 text-[20px] font-light text-ink">{fmt(elapsed)}</div>
                  <div className="mt-1 text-[12px] text-ink3">Идёт запись</div>
                </>
              ) : (
                <p className="mt-3 text-[13px] text-ink3">Нажмите и говорите</p>
              )}

              {micError && (
                <p className="mt-3 text-center text-[12px]" style={{ color: "#E86A6A" }}>
                  Нет доступа к микрофону — разрешите его в настройках браузера
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
