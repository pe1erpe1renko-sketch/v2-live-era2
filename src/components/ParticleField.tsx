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
    let points: { x: number; y: number; ox: number; oy: number; d: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const STEP = 22;

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

      const cx = w / 2;
      const cy = h / 2;
      const maxD = Math.hypot(cx, cy);
      points = [];
      for (let y = STEP / 2; y < h; y += STEP) {
        for (let x = STEP / 2; x < w; x += STEP) {
          const jx = x + (Math.random() - 0.5) * 6;
          const jy = y + (Math.random() - 0.5) * 6;
          const d = Math.hypot(jx - cx, jy - cy) / maxD;
          if (Math.random() > 1 - d * 0.85) continue;
          points.push({ x: jx, y: jy, ox: jx, oy: jy, d });
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
      const cx = w / 2;
      const cy = h / 2;
      const maxD = Math.hypot(cx, cy);
      const phase = (time % 2000) / 2000;

      for (const p of points) {
        const dist = Math.hypot(p.ox - cx, p.oy - cy) / maxD;
        let wave = (phase - dist * 0.5) % 1;
        if (wave < 0) wave += 1;
        const pulse = ease(wave < 0.5 ? wave * 2 : (1 - wave) * 2);

        const mdx = p.ox - mouse.x;
        const mdy = p.oy - mouse.y;
        const md = Math.hypot(mdx, mdy);
        let tx = p.ox;
        let ty = p.oy;
        if (md < 140 && md > 0.001) {
          const push = (1 - md / 140) * 6;
          tx = p.ox - (mdx / md) * push;
          ty = p.oy - (mdy / md) * push;
        }
        p.x += (tx - p.x) * 0.06;
        p.y += (ty - p.y) * 0.06;

        const falloff = Math.max(0, 1 - dist * 1.15);
        const alpha = falloff * (0.25 + pulse * 0.55);
        if (alpha <= 0.01) continue;
        const r = 1 + pulse * 0.5;

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
