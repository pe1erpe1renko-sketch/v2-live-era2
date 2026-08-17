import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useCreate } from "@/components/create/CreateContext";

// TODO backend: загрузку и хранение видео-эталона, повторную проверку размера,
// длительности и кодека на сервере, передачу второго файла и итоговой
// длительности в запрос генерации.

const MAX_BYTES = 100 * 1024 * 1024;
const MIN_SEC = 2;
const MAX_SEC = 15;
const EXT = /\.(mp4|mov)$/i;

function fmtSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} МБ` : `${Math.max(1, Math.round(bytes / 1024))} КБ`;
}

/** первый кадр видео как data-url для превью */
function grabFirstFrame(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.src = url;
    v.muted = true;
    v.preload = "metadata";
    v.addEventListener("loadeddata", () => {
      try {
        const c = document.createElement("canvas");
        c.width = v.videoWidth || 320;
        c.height = v.videoHeight || 180;
        c.getContext("2d")?.drawImage(v, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.7));
      } catch {
        resolve(null);
      }
    });
    v.addEventListener("error", () => resolve(null));
    try {
      v.currentTime = 0.1;
    } catch {
      /* noop */
    }
  });
}

function probeDuration(url: string): Promise<number> {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = url;
    v.addEventListener("loadedmetadata", () =>
      resolve(Number.isFinite(v.duration) ? v.duration : 0),
    );
    v.addEventListener("error", () => resolve(0));
  });
}

export function VideoRefPanel() {
  const { videoFile, setVideoFile, setVideoDuration } = useCreate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoFile) {
      setUrl(null);
      setPoster(null);
      setSeconds(0);
      setVideoDuration(null);
      return;
    }
    const u = URL.createObjectURL(videoFile);
    setUrl(u);
    void grabFirstFrame(u).then(setPoster);
    return () => URL.revokeObjectURL(u);
  }, [videoFile, setVideoDuration]);

  const accept = async (f: File) => {
    setError(null);
    if (!EXT.test(f.name)) {
      setError("Подходят только файлы MP4 или MOV");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("Файл больше 100 МБ");
      return;
    }
    const u = URL.createObjectURL(f);
    const d = await probeDuration(u);
    URL.revokeObjectURL(u);
    if (!d) {
      setError("Не удалось прочитать видео — попробуйте другой файл");
      return;
    }
    if (d < MIN_SEC) {
      setError("Ролик короче 2 секунд");
      return;
    }
    if (d > MAX_SEC) {
      setError("Ролик длиннее 15 секунд");
      return;
    }
    setSeconds(d);
    setVideoDuration(d);
    setVideoFile(f);
  };

  const remove = () => {
    setVideoFile(null);
    setVideoDuration(null);
    setSeconds(0);
    setError(null);
  };

  const hint = (
    <p className="mt-3 text-[13px] leading-[1.5] text-ink2">
      С этого ролика снимется движение и перенесётся на человека со снимка. Длительность готового
      видео будет такой же, звук возьмётся отсюда же. Лучше всего работает ролик, где человек в
      кадре один и виден целиком.
    </p>
  );

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="video/mp4,video/quicktime,.mp4,.mov"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) void accept(f);
        e.target.value = "";
      }}
    />
  );

  return (
    <div className="mt-4">
      <div className="type-label mb-2 text-ink3">Шаг 2 · Видео-эталон</div>

      {videoFile && url ? (
        <div className="flex items-start gap-4 rounded-[16px] border border-rule bg-surface p-4">
          {poster ? (
            <img
              src={poster}
              alt="Первый кадр видео-эталона"
              className="h-[72px] w-[108px] shrink-0 rounded-[6px] object-cover"
            />
          ) : (
            <div className="flex h-[72px] w-[108px] shrink-0 items-center justify-center rounded-[6px] border border-rule">
              <Icon icon="solar:videocamera-linear" width={20} height={20} className="text-gold2" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] text-ink">{videoFile.name}</div>
            <div className="mt-1 text-[12px] text-ink3">
              {fmtSize(videoFile.size)} · {Math.ceil(seconds)} сек
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 text-[12px] text-gold2 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
            >
              Заменить
            </button>
          </div>
          <button
            type="button"
            aria-label="Удалить видео-эталон"
            onClick={remove}
            className="shrink-0 text-ink3 transition-colors hover:text-[#E86A6A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          >
            <Icon icon="solar:close-circle-linear" width={18} height={18} />
          </button>
          {input}
        </div>
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
            if (f) void accept(f);
          }}
          style={drag ? { backgroundColor: "rgba(176,141,87,0.06)" } : undefined}
          className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed px-4 text-center transition-colors duration-200 hover:border-gold2 hover:bg-[rgba(176,141,87,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 md:min-h-[220px] md:px-5 ${
            drag ? "border-gold2" : "border-rule"
          }`}
        >
          <Icon icon="solar:videocamera-linear" className="h-6 w-6 text-gold2 md:h-7 md:w-7" />
          <p className="mt-3 text-[14px] text-ink md:text-[15px]">Загрузите видео-эталон</p>
          <p className="mt-1.5 text-[12px] text-ink3 md:text-[13px]">
            MP4 или MOV до 100 МБ, от 2 до 15 секунд
          </p>
          {input}
        </div>
      )}

      {error && (
        <p className="mt-2 text-[12px]" style={{ color: "#E86A6A" }}>
          {error}
        </p>
      )}

      {hint}
    </div>
  );
}
