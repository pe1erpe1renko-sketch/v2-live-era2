import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
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
          "Подписки и разовые пакеты токенов Live Era2. Ролик от 29 ₽, первая генерация бесплатно.",
      },
      { property: "og:title", content: "Цены — Live Era2" },
      {
        property: "og:description",
        content: "Подписки и пакеты токенов Live Era2. Ролик от 29 ₽, первая генерация бесплатно.",
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
        <div className="mx-auto max-w-[1440px] px-8 pb-10 pt-4 lg:px-16 lg:pt-4">
          <h1 className="text-left text-[clamp(22px,2.7vw,35px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
            Цены
          </h1>

          <div className="mt-3 flex justify-center">
            <div className="inline-flex rounded-full border border-rule bg-surface p-1">
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
