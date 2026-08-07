import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let points: { x: number; y: number; ox: number; oy: number; d: number; s: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const STEP = 14;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Center the dense dot cluster on the photo cards in Hero.
      const cards = wrap.parentElement?.querySelector('.photo-cards-target') as HTMLElement | null;
      const cardsRect = cards?.getBoundingClientRect();

      const cx = cardsRect
        ? cardsRect.left + cardsRect.width / 2 - rect.left
        : w / 2;
      const cy = cardsRect
        ? cardsRect.top + cardsRect.height / 2 - rect.top
        : h / 2;
      // radius of the dense circular core
      const core = Math.min(w, h) * 0.42;
      const maxD = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(w - cx, cy),
        Math.hypot(cx, h - cy),
        Math.hypot(w - cx, h - cy)
      );
      points = [];
      for (let y = STEP / 2; y < h; y += STEP) {
        for (let x = STEP / 2; x < w; x += STEP) {
          const jx = x + (Math.random() - 0.5) * 5;
          const jy = y + (Math.random() - 0.5) * 5;
          const r = Math.hypot(jx - cx, jy - cy);
          // 1 in the core, fading to 0 at the edges
          const t = Math.max(0, Math.min(1, 1 - (r - core) / (maxD - core)));
          const density = t * t;
          // keep every point in the core, thin out towards the edges
          if (r > core && Math.random() > density * 0.85) continue;
          points.push({ x: jx, y: jy, ox: jx, oy: jy, d: r / maxD, s: density });
        }
      }
    };

    // cubic-bezier(0.4, 0, 0.6, 1) approximation for the breathing wave
    const ease = (t: number) => {
      const u = 1 - t;
      return 3 * u * u * t * 0 + 3 * u * t * t * 1 + t * t * t;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const phase = (time % 2000) / 2000;

      for (const p of points) {
        let wave = (phase - p.d * 0.5) % 1;
        if (wave < 0) wave += 1;
        const pulse = ease(wave < 0.5 ? wave * 2 : (1 - wave) * 2);

        const mdx = p.ox - mouse.x;
        const mdy = p.oy - mouse.y;
        const md = Math.hypot(mdx, mdy);
        let tx = p.ox;
        let ty = p.oy;
        if (md < 160 && md > 0.001) {
          const push = (1 - md / 160) * 10;
          tx = p.ox - (mdx / md) * push;
          ty = p.oy - (mdy / md) * push;
        }
        p.x += (tx - p.x) * 0.06;
        p.y += (ty - p.y) * 0.06;

        const alpha = (0.2 + p.s * 0.75) * (0.55 + pulse * 0.45);
        if (alpha <= 0.015) continue;
        const r = 0.9 + p.s * 0.9 + pulse * 0.35;

        ctx.beginPath();
        ctx.fillStyle = `rgba(176, 141, 87, ${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };


    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 motion-reduce:dot-grid-static">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
