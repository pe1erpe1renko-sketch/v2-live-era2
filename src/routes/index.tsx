import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Steps } from "@/components/Steps";
import { Scenarios } from "@/components/Scenarios";
import { Reasons } from "@/components/Reasons";
import { Models } from "@/components/Models";
import { Specs } from "@/components/Specs";
import { Tips } from "@/components/Tips";
import { Reviews } from "@/components/Reviews";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { AboutText } from "@/components/AboutText";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live Era2 — оживить фото онлайн бесплатно, нейросеть сделает видео из снимка" },
      {
        name: "description",
        content:
          "Загрузите фотографию и получите короткое видео: Kling 3, Sora, Veo и Seedance в одном окне. Первый ролик бесплатно, без VPN, оплата картой РФ.",
      },
      { property: "og:title", content: "Live Era2 — оживить фото нейросетью онлайн" },
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
              duration: 0.4,
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
        <Hero />
        <StatsBar />
        <div data-reveal>
          <Scenarios />
        </div>
        <div data-reveal>
          <Steps />
        </div>
        <div data-reveal>
          <Reasons />
        </div>
        <div data-reveal>
          <Models />
        </div>
        <div data-reveal>
          <Specs />
        </div>
        <div data-reveal>
          <Pricing />
        </div>
        <div data-reveal>
          <Reviews />
        </div>
        <div data-reveal>
          <Tips />
        </div>
        <div data-reveal>
          <Faq />
        </div>
        <div data-reveal>
          <AboutText />
        </div>
      </main>
      <div data-reveal>
        <Footer />
      </div>
    </div>
  );
}
