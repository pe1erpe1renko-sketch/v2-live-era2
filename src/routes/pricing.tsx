import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { LightLayout } from "@/components/layouts/LightLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { SubscriptionPlans } from "@/components/pricing/SubscriptionPlans";
import { TokenPacks } from "@/components/pricing/TokenPacks";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { TokenUsage } from "@/components/pricing/TokenUsage";
import { PaymentFaq } from "@/components/pricing/PaymentFaq";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Цены — Live Era2" },
      {
        name: "description",
        content:
          "Подписки и разовые пакеты токенов Live Era2. Ролик от 12 ₽, первая генерация бесплатно.",
      },
      { property: "og:title", content: "Цены — Live Era2" },
      {
        property: "og:description",
        content: "Подписки и пакеты токенов Live Era2. Ролик от 12 ₽, первая генерация бесплатно.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"sub" | "packs">("sub");

  return (
    <LightLayout>
      <section>
        <div className="mx-auto max-w-[1440px] px-8 pb-16 pt-16 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <SectionLabel>Цены</SectionLabel>

            <h1 className="mt-4 text-[clamp(32px,4vw,52px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
              Ролик от 12 ₽
            </h1>

            <p className="mt-3 max-w-[640px] text-[15px] leading-[1.6] text-ink2">
              Первая генерация бесплатна и не требует карты. Дальше — подписка или разовые пакеты
              токенов, как удобнее.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-rule bg-surface p-1">
              <button
                type="button"
                onClick={() => setTab("sub")}
                className={`rounded-full px-6 py-2.5 text-[14px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  tab === "sub" ? "bg-gold text-white" : "bg-transparent text-ink2"
                }`}
              >
                Подписка
                <span
                  className={`ml-1.5 text-[11px] ${tab === "sub" ? "text-gold3" : "text-ink3"}`}
                >
                  −20%
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTab("packs")}
                className={`rounded-full px-6 py-2.5 text-[14px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  tab === "packs" ? "bg-gold text-white" : "bg-transparent text-ink2"
                }`}
              >
                Пакеты токенов
              </button>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold3 px-6 py-3 text-[14px] text-gold">
              <Icon icon="solar:gift-linear" width={18} height={18} className="shrink-0" />
              Первая генерация — бесплатно. Карта не нужна.
            </div>
          </div>

          {tab === "sub" ? <SubscriptionPlans /> : <TokenPacks />}
        </div>
      </section>

      <ComparisonTable />
      <TokenUsage />
      <PaymentFaq />
    </LightLayout>
  );
}
