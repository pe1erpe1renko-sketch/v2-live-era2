import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live Era — оживить фото нейросетью онлайн, без VPN" },
      {
        name: "description",
        content:
          "Загрузите снимок и получите короткое видео. Kling 3, Sora, Veo и Seedance в одном окне, MP4 без водяных знаков, оплата картой РФ.",
      },
      { property: "og:title", content: "Live Era — оживить фото нейросетью онлайн" },
      {
        property: "og:description",
        content: "Снимок становится живым видео за пару минут. Русский интерфейс, без VPN.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power1.inOut",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-bg">
      <Header />
      <main>
        <div data-reveal>
          <Hero />
        </div>
      </main>
      <div data-reveal>
        <Footer />
      </div>
    </div>
  );
}
