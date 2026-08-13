import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SectionLabel } from "./SectionLabel";
import portraitOld from "@/assets/portrait-old.jpg";
import portraitRestored from "@/assets/portrait-restored.jpg";
import { AppLink } from "@/components/AppLink";

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
      className={`cursor-pointer rounded-[6px] border border-dashed p-5 text-center transition-colors duration-200 hover:border-gold2 hover:bg-gold3 lg:p-[clamp(12px,2.2vh,20px)] ${
        over ? "border-gold2 bg-gold3" : "border-rule"
      }`}
    >
      <input
        ref={inputRef}
        id="hero-upload"
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        tabIndex={0}
        aria-label="Загрузить снимок"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <Icon icon="solar:gallery-add-linear" className="mx-auto h-7 w-7 text-gold2" />
      <p className="mt-2 text-[14px] text-ink">
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
    <figure className={`w-full min-w-0 flex-1 ${className ?? ""}`}>
      <div className="rounded-[6px] border border-rule bg-surface p-2 pb-7 shadow-card sm:p-3 sm:pb-10">
        <img
          src={src}
          alt={caption}
          width={640}
          height={800}
          className="aspect-[4/5] w-full object-cover"
        />
        <figcaption className="mt-3 flex items-center justify-center gap-2 sm:mt-4 sm:gap-3">
          {dot ? <span className="block h-[6px] w-[6px] shrink-0 rounded-full bg-gold2" /> : null}
          <span className="type-label whitespace-nowrap text-[10px] tracking-[0.1em] sm:text-[12px] sm:tracking-[0.14em]">
            {caption}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function PhotoStage() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const enabledRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const curRef = useRef({ x: 0, y: 0 });
  const easeRef = useRef(0.15);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => {
      enabledRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tick = () => {
    const t = targetRef.current;
    const c = curRef.current;
    const k = easeRef.current;
    c.x += (t.x - c.x) * k;
    c.y += (t.y - c.y) * k;

    const max = 12;
    const lx = c.x * max;
    const ly = c.y * max;
    const rotY = c.x * 2;
    const rotX = -c.y * 2;

    if (leftRef.current) {
      leftRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    if (rightRef.current) {
      rightRef.current.style.transform = `translate3d(${lx * 0.6}px, ${ly * 0.6}px, 0) rotateX(${rotX * 0.6}deg) rotateY(${rotY * 0.6}deg)`;
    }

    const done = Math.abs(t.x - c.x) < 0.001 && Math.abs(t.y - c.y) < 0.001;
    if (done) {
      c.x = t.x;
      c.y = t.y;
      rafRef.current = null;
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabledRef.current || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    targetRef.current = { x: nx, y: ny };
    easeRef.current = 0.15;
    start();
  };

  const onLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    easeRef.current = 0.08;
    start();
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex h-full min-h-0 items-center justify-center px-4 lg:px-8"
    >
      <div
        className="photo-cards-target flex max-h-full w-[92%] items-center lg:w-[88%]"
        style={{ perspective: "1000px" }}
      >
        <div ref={leftRef} className="min-w-0 flex-1" style={{ willChange: "transform" }}>
          <PhotoCard src={portraitOld} caption="Исходник" className="translate-y-2 -rotate-2" />
        </div>
        <div
          ref={rightRef}
          className="-ml-1 min-w-0 flex-1 lg:-ml-3"
          style={{ willChange: "transform" }}
        >
          <PhotoCard src={portraitRestored} caption="В движении" dot className="-translate-y-2 rotate-2" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [tab, setTab] = useState<"photo" | "text">("photo");

  return (
    <section id="hero" className="lg:min-h-[calc(100svh-72px)]">
      <div className="mx-auto grid h-full max-w-[1440px] lg:grid-cols-[42%_58%]">
        {/* Left */}
        <div className="flex flex-col justify-center border-rule px-8 pb-0 pt-10 lg:border-r lg:px-16 lg:py-[clamp(20px,4vh,40px)]">
          <SectionLabel>Снимок → Видео</SectionLabel>

          <h1 className="mt-4 font-light leading-[1.05] tracking-[-0.05em] text-[clamp(32px,3.4vw,52px)] lg:mt-[clamp(10px,2vh,24px)] lg:text-[clamp(28px,4.6vh,52px)]">
            <span className="block text-ink">Оживить фото бесплатно</span>
            <span className="block text-ink3">снимок станет живым видео</span>
          </h1>

          <p className="type-body mt-4 max-w-[460px] lg:mt-[clamp(10px,2vh,24px)] lg:text-[clamp(13px,1.8vh,16px)]">
            Kling 3, Sora, Veo и Seedance — в одном окне. Загружаете снимок, через пару минут
            забираете MP4 без водяных знаков. Русский интерфейс, оплата картой РФ, VPN не нужен.
          </p>

          {/* Form card */}
          <div id="form" className="hairline-frame mt-6 shadow-card lg:mt-[clamp(10px,2vh,24px)]">
            <div className="rounded-[16px] bg-surface p-6 lg:p-[clamp(16px,2.4vh,24px)]">
              <div className="flex gap-6 border-b border-rule2">
                {[
                  { id: "photo" as const, label: "Фото в видео" },
                  { id: "text" as const, label: "Видео из текста" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`-mb-px rounded-[6px] px-3 py-2.5 text-[14px] transition-colors ${
                      tab === t.id
                        ? "border-b-2 border-gold2 bg-gold3 text-gold"
                        : "border-b-2 border-transparent text-ink3 hover:text-ink2"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 lg:mt-[clamp(8px,1.4vh,12px)]">
                {tab === "photo" ? <UploadZone /> : null}
              </div>

              <input
                type="text"
                placeholder="Опишите движение — или оставьте пустым"
                className="mt-3 w-full rounded-[6px] border border-rule bg-surface px-4 py-2.5 text-[14px] text-ink placeholder:text-ink3 lg:mt-[clamp(8px,1.4vh,12px)]"
              />

              <AppLink
                href="/create"
                className="mt-3 block w-full rounded-[6px] bg-gold px-4 py-3 text-center text-[15px] text-surface transition-colors hover:bg-gold-dark lg:mt-[clamp(8px,1.4vh,12px)] lg:px-[clamp(12px,1.8vh,16px)] lg:py-[clamp(12px,1.8vh,16px)]"
              >
                Оживить снимок — первый ролик бесплатно
              </AppLink>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative overflow-hidden pb-8 pt-8 lg:h-auto lg:min-h-[calc(100svh-72px)] lg:py-0" style={{ backgroundColor: "#EFEFED" }}>
          <div className="pointer-events-none absolute right-8 top-8 hidden h-8 w-8 border-r border-t border-rule lg:block" />

          <PhotoStage />

          <p className="type-label mx-auto mt-6 w-fit rounded-full border border-rule bg-bg px-4 py-1.5 text-center text-ink2 lg:absolute lg:bottom-8 lg:left-8 lg:mx-0 lg:mt-0">
            Один кадр · 5 секунд видео
          </p>
        </div>
      </div>
    </section>
  );
}
