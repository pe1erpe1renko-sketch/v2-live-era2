import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SectionLabel } from "./SectionLabel";
import { ParticleField } from "./ParticleField";
import portraitOld from "@/assets/portrait-old.jpg";
import portraitRestored from "@/assets/portrait-restored.jpg";

function UploadZone() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFileName(f.name);
      }}
      className={`cursor-pointer rounded-[6px] border border-dashed p-8 text-center transition-colors duration-200 hover:border-gold2 hover:bg-gold3 ${
        over ? "border-gold2 bg-gold3" : "border-rule"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        aria-label="Загрузить снимок"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <Icon icon="solar:gallery-add-linear" className="mx-auto h-8 w-8 text-gold2" />
      <p className="mt-3 text-[14px] text-ink">
        {fileName ?? "Перетащите снимок или выберите файл"}
      </p>
      <p className="mt-1 text-[12px] text-ink3">JPG или PNG</p>
    </div>
  );
}

function PhotoCard({
  src,
  caption,
  dot,
  className,
}: {
  src: string;
  caption: string;
  dot?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="rounded-[6px] border border-rule bg-surface p-3 shadow-card">
        <img
          src={src}
          alt={caption}
          width={640}
          height={800}
          className="h-[180px] w-[140px] object-cover sm:h-[240px] sm:w-[190px]"
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-3">
        {dot ? <span className="block h-[6px] w-[6px] rounded-full bg-gold2" /> : null}
        <span className="type-label">{caption}</span>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const [tab, setTab] = useState<"photo" | "text">("photo");

  return (
    <section className="border-b border-rule">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[42%_58%]">
        {/* Left */}
        <div className="border-rule p-8 lg:border-r lg:p-16">
          <SectionLabel>Снимок → Видео</SectionLabel>

          <h1 className="type-display mt-6">
            <span className="block text-ink">Оживить фото бесплатно</span>
            <span className="block text-ink3">снимок станет живым видео</span>
          </h1>

          <p className="type-body mt-6 max-w-[460px]">
            Kling 3, Sora, Veo и Seedance — в одном окне. Загружаете снимок, через пару минут
            забираете MP4 без водяных знаков. Русский интерфейс, оплата картой РФ, VPN не нужен.
          </p>

          {/* Form card */}
          <div id="form" className="hairline-frame mt-8 shadow-card">
            <div className="rounded-[16px] bg-surface p-8">
              <div className="flex gap-6 border-b border-rule2">
                {[
                  { id: "photo" as const, label: "Фото в видео" },
                  { id: "text" as const, label: "Видео из текста" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`-mb-px rounded-[6px] px-3 py-3 text-[14px] transition-colors ${
                      tab === t.id
                        ? "border-b-2 border-gold2 bg-gold3 text-gold"
                        : "border-b-2 border-transparent text-ink3 hover:text-ink2"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">{tab === "photo" ? <UploadZone /> : null}</div>

              <input
                type="text"
                placeholder="Опишите движение — или оставьте пустым"
                className="mt-4 w-full rounded-[6px] border border-rule bg-surface px-4 py-3 text-[14px] text-ink placeholder:text-ink3"
              />

              <button
                type="button"
                className="mt-4 w-full rounded-[6px] bg-gold p-4 text-[15px] text-surface transition-colors hover:bg-gold-dark"
              >
                Оживить снимок — первый ролик бесплатно
              </button>

              <p className="type-label mt-4 text-center">Без VPN · Русский интерфейс · Карта РФ</p>
            </div>
          </div>

          {/* Summary panel */}
          <div className="mt-8 border-t border-rule py-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="type-label">Моделей в доступе</p>
                <p className="mt-3 text-[36px] font-light leading-none text-ink">10</p>
              </div>
              <div>
                <p className="type-label">Статус</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="block h-[6px] w-[6px] rounded-full bg-gold2" />
                  <span className="type-label text-ink">Первая генерация бесплатна</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule2 pt-6">
              <span className="rounded-full bg-gold3 px-3 py-1.5 text-[12px] text-gold">
                Реставрация включена
              </span>
              <span className="type-label">MP4 · Без водяных знаков</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative h-[60vh] overflow-hidden bg-bg lg:h-auto lg:min-h-[720px]">
          <ParticleField />

          <div className="pointer-events-none absolute right-8 top-8 h-8 w-8 border-r border-t border-rule" />

          <div className="relative flex h-full items-center justify-center gap-3 px-8">
            <PhotoCard
              src={portraitOld}
              caption="Исходник"
              className="translate-y-6 -rotate-2"
            />
            <PhotoCard
              src={portraitRestored}
              caption="В движении"
              dot
              className="-translate-y-6 rotate-2"
            />
          </div>

          <p className="type-label absolute bottom-8 left-8">Один кадр · 5 секунд видео</p>
        </div>
      </div>
    </section>
  );
}
