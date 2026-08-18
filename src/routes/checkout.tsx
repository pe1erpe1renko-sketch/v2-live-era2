import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { LightLayout } from "@/components/layouts/LightLayout";
import { AppLink } from "@/components/AppLink";

type PlanId = "start" | "pro" | "ultra";
type PeriodId = "1month" | "3months" | "6months" | "year";

const PLANS: Record<PlanId, { name: string; monthly: number; tokens: number }> = {
  start: { name: "Старт", monthly: 490, tokens: 115 },
  pro: { name: "Про", monthly: 990, tokens: 260 },
  ultra: { name: "Ультра", monthly: 2450, tokens: 760 },
};

const PERIODS: { id: PeriodId; label: string; months: number; k: number }[] = [
  { id: "1month", label: "1 месяц", months: 1, k: 1 },
  { id: "3months", label: "3 месяца", months: 3, k: 0.95 },
  { id: "6months", label: "6 месяцев", months: 6, k: 0.9 },
  { id: "year", label: "1 год", months: 12, k: 0.85 },
];

const priceFor = (plan: PlanId, period: PeriodId) => {
  const p = PERIODS.find((x) => x.id === period)!;
  return Math.round(PLANS[plan].monthly * p.months * p.k);
};

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\u00A0/g, " ");

const isPlan = (v: unknown): v is PlanId => typeof v === "string" && v in PLANS;
const isPeriod = (v: unknown): v is PeriodId =>
  typeof v === "string" && PERIODS.some((p) => p.id === v);

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: isPlan(search['plan']) ? search['plan'] : ("pro" as PlanId),
    period: isPeriod(search['period']) ? search['period'] : ("1month" as PeriodId),
  }),
  head: () => ({
    meta: [
      { title: "Оформление подписки — Live Era2" },
      {
        name: "description",
        content:
          "Оформление подписки Live Era2: выбор периода оплаты, скидки до 15% и email для чека.",
      },
      { property: "og:title", content: "Оформление подписки — Live Era2" },
      {
        property: "og:description",
        content: "Выберите период оплаты подписки Live Era2 и укажите email для чека.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function nextChargeDate(months: number) {
  const d = new Date();
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

const PANEL = "rounded-[16px] border border-rule bg-surface p-7 md:p-8";

function Page() {
  const { plan, period } = Route.useSearch();
  const navigate = useNavigate({ from: "/checkout" });
  const planData = PLANS[plan];
  const periodData = PERIODS.find((p) => p.id === period)!;
  const total = priceFor(plan, period);

  // TODO backend: получение почты из профиля и сохранение введённой почты
  const profileEmail = "";
  const [email, setEmail] = useState(profileEmail);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setEmail(profileEmail);
  }, [profileEmail]);

  const setPeriod = (id: PeriodId) => {
    void navigate({ search: { plan, period: id }, replace: true });
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("");
      return;
    }
    setEmailError(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "" : "Проверьте формат адреса");
  };

  return (
    <LightLayout>
      <section className="mx-auto max-w-[1440px] px-8 pb-16 pt-6 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="type-label">Чекаут</span>
            <h1 className="mt-2 text-[clamp(24px,3vw,38px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
              Оформление подписки
            </h1>
          </div>
          <AppLink
            href="/pricing"
            className="inline-flex items-center gap-2 text-[14px] text-ink2 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Сменить тариф
          </AppLink>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Правая колонка (на мобильных — первая) */}
          <div className="order-1 flex w-full flex-col gap-6 lg:order-2 lg:w-[55%]">
            <div className={PANEL}>
              <h2 className="text-[20px] font-light tracking-[-0.02em] text-ink">Период оплаты</h2>
              <div className="mt-5 flex flex-col gap-2.5">
                {PERIODS.map((p) => {
                  const active = p.id === period;
                  const discount = Math.round((1 - p.k) * 100);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPeriod(p.id)}
                      className={`flex w-full items-center gap-3 rounded-[12px] border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                        active ? "border-gold2 bg-gold/[0.06]" : "border-rule bg-transparent hover:border-ink3"
                      }`}
                    >
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                          active ? "border-gold2" : "border-rule"
                        }`}
                      >
                        {active && <span className="h-[8px] w-[8px] rounded-full bg-gold2" />}
                      </span>
                      <span className="flex-1 text-[15px] text-ink">{p.label}</span>
                      {discount > 0 && (
                        <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] text-gold">
                          −{discount}%
                        </span>
                      )}
                      <span className="text-[15px] text-ink">{fmt(priceFor(plan, p.id))} ₽</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-[12px] leading-[1.5] text-ink3">
                Чем длиннее период — тем ниже цена месяца. Списание раз в выбранный период
              </p>
            </div>

            <div className={PANEL}>
              <h2 className="text-[20px] font-light tracking-[-0.02em] text-ink">Email для чека</h2>
              <p className="mt-2 text-[12px] leading-[1.5] text-ink3">
                Отправим на него электронный чек об оплате. Адрес сохранится в профиле — войти по
                нему нельзя
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="you@example.com"
                className={`mt-4 h-12 w-full rounded-[6px] border bg-surface px-4 text-[14px] text-ink placeholder:text-ink3 outline-none transition-colors focus:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  emailError ? "border-red-500" : "border-rule"
                }`}
              />
              {emailError && <p className="mt-2 text-[12px] text-red-600">{emailError}</p>}
            </div>
          </div>

          {/* Левая колонка — сводка */}
          <div className={`order-2 w-full lg:order-1 lg:w-[45%] ${PANEL}`}>
            <span className="type-label">Ваш план</span>
            <p className="mt-2 text-[clamp(26px,2.6vw,34px)] font-light leading-none tracking-[-0.03em] text-ink">
              {planData.name}
            </p>

            <dl className="mt-6 flex flex-col gap-3 text-[14px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink3">Аккаунт</dt>
                <dd className="text-right text-ink">{email.trim() || "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink3">Токенов в месяц</dt>
                <dd className="text-right text-ink">{planData.tokens}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink3">Период</dt>
                <dd className="text-right text-ink">{periodData.label}</dd>
              </div>
            </dl>

            <hr className="my-6 border-0 border-t border-rule" />

            <span className="type-label">К оплате</span>
            <p className="mt-2 text-[clamp(34px,4vw,48px)] font-light leading-none tracking-[-0.03em] text-ink">
              {fmt(total)} ₽
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-ink3">
              Следующее списание: {nextChargeDate(periodData.months)} · {fmt(total)} ₽
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <AppLink
            href="/pricing"
            className="text-[14px] text-ink2 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
          >
            ← Вернуться к тарифам
          </AppLink>
        </div>
      </section>
    </LightLayout>
  );
}
