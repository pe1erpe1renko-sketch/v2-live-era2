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

// TODO backend: проверка промокода на сервере, сейчас список зашит на фронте
const PROMOS: Record<string, number> = { GROW20: 0.2 };

const priceFor = (plan: PlanId, period: PeriodId) => {
  const p = PERIODS.find((x) => x.id === period)!;
  return Math.round(PLANS[plan].monthly * p.months * p.k);
};

const promoPriceFor = (plan: PlanId, period: PeriodId, discount: number) => {
  const p = PERIODS.find((x) => x.id === period)!;
  return Math.round(PLANS[plan].monthly * p.months * (1 - discount));
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

const PANEL = "rounded-[16px] border border-rule bg-surface p-4 md:p-5";
const DIVIDER = "border-0 border-t border-rule";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LEGAL_LINK =
  "text-ink underline underline-offset-2 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2";

function Page() {
  const { plan, period } = Route.useSearch();
  const navigate = useNavigate({ from: "/checkout" });
  const planData = PLANS[plan];
  const periodData = PERIODS.find((p) => p.id === period)!;

  // TODO backend: получение почты из профиля и сохранение введённой почты
  const profileEmail = "";
  const [email, setEmail] = useState(profileEmail);
  const [emailError, setEmailError] = useState("");

  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const [gift, setGift] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    setEmail(profileEmail);
  }, [profileEmail]);

  const total = promo
    ? promoPriceFor(plan, period, promo.discount)
    : priceFor(plan, period);

  const setPeriod = (id: PeriodId) => {
    void navigate({ search: { plan, period: id }, replace: true });
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("");
      return;
    }
    setEmailError(EMAIL_RE.test(email.trim()) ? "" : "Проверьте формат адреса");
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const discount = PROMOS[code];
    if (discount === undefined) {
      setPromoError("Такого промокода нет");
      return;
    }
    setPromoError("");
    setPromo({ code, discount });
  };

  const emailValid = EMAIL_RE.test(email.trim());
  const canPay = emailValid && agreed;

  return (
    <LightLayout>
      <section className="mx-auto max-w-[1440px] px-6 pb-8 pt-4 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="type-label">Чекаут</span>
            <h1 className="mt-1.5 text-[clamp(24px,3vw,38px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
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

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* Правая колонка (на мобильных — первая) */}
          <div className="order-1 flex w-full flex-col lg:order-2 lg:w-[55%]">
            <div className={PANEL}>
              {/* Период оплаты */}
              <span className="type-label">Период оплаты</span>
              <div className="mt-2 flex flex-col gap-1">
                {PERIODS.map((p) => {
                  const active = p.id === period;
                  const discount = Math.round((1 - p.k) * 100);
                  const rowPrice = promo
                    ? promoPriceFor(plan, p.id, promo.discount)
                    : priceFor(plan, p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPeriod(p.id)}
                      className={`flex w-full items-center gap-3 rounded-[10px] border px-3.5 py-3 text-left leading-[1.25] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                        active ? "border-gold2 bg-gold/[0.06]" : "border-rule bg-transparent hover:border-ink3"
                      }`}
                    >
                      <span
                        className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border ${
                          active ? "border-gold2" : "border-rule"
                        }`}
                      >
                        {active && <span className="h-[7px] w-[7px] rounded-full bg-gold2" />}
                      </span>
                      <span className="flex-1 text-[14px] text-ink">{p.label}</span>
                      {discount > 0 && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] leading-none transition-opacity ${
                            promo ? "bg-ink3/10 text-ink3 opacity-40" : "bg-gold/10 text-gold"
                          }`}
                        >
                          −{discount}%
                        </span>
                      )}
                      <span className="text-[14px] text-ink">{fmt(rowPrice)} ₽</span>
                    </button>
                  );
                })}
              </div>
              {promo ? (
                <p className="mt-2 text-[12px] leading-[1.5] text-ink3">
                  Действует промокод — скидка за период не применяется
                </p>
              ) : (
                <p className="mt-2 text-[12px] leading-[1.5] text-ink3">
                  Чем длиннее период — тем ниже цена месяца. Списание раз в выбранный период
                </p>
              )}

              <hr className={`${DIVIDER} my-3`} />

              {/* Email для чека */}
              <span className="type-label">Email для чека</span>
              <p className="mt-1.5 text-[12px] leading-[1.5] text-ink3">
                Отправим на него электронный чек об оплате. Адрес сохранится в профиле — войти по
                нему нельзя
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="you@example.com"
                className={`mt-2 h-11 w-full rounded-[6px] border bg-surface px-3.5 text-[14px] text-ink placeholder:text-ink3 outline-none transition-colors focus:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                  emailError ? "border-red-500" : "border-rule"
                }`}
              />
              {emailError && <p className="mt-1.5 text-[12px] text-red-600">{emailError}</p>}

              <hr className={`${DIVIDER} my-3`} />

              {/* Согласие */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-[16px] w-[16px] shrink-0 accent-[#8A6A2F]"
                />
                <span className="text-[13px] leading-[1.45] text-ink2">
                  Я принимаю{" "}
                  <AppLink href="/offer" className={LEGAL_LINK}>
                    Публичную оферту
                  </AppLink>
                  ,{" "}
                  <AppLink href="/terms" className={LEGAL_LINK}>
                    Пользовательское соглашение
                  </AppLink>{" "}
                  и{" "}
                  <AppLink href="/privacy" className={LEGAL_LINK}>
                    Политику обработки персональных данных
                  </AppLink>
                  {gift ? (
                    <>
                      . Это разовый платёж за подарочную подписку «{planData.name}» на выбранный
                      период. Автопродление не подключается
                    </>
                  ) : (
                    <>
                      {" "}
                      и разрешаю списывать {fmt(total)} ₽ раз в выбранный период в счёт подписки «
                      {planData.name}». Отменить автопродление можно в любой момент в личном
                      кабинете
                    </>
                  )}
                </span>
              </label>

              {/* Оплата */}
              <div className="mt-3">
                {/* TODO backend: сюда подставить платёжную ссылку магазина с суммой, тарифом и периодом */}
                <a
                  href="https://yookassa.ru"
                  aria-disabled={!canPay}
                  onClick={(e) => {
                    if (!canPay) e.preventDefault();
                  }}
                  className={`flex h-11 w-full items-center justify-center rounded-[8px] bg-gold text-[15px] text-white transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    canPay ? "hover:opacity-90" : "pointer-events-none opacity-40"
                  }`}
                >
                  {gift ? "Подарить за" : "Оплатить"} {fmt(total)} ₽
                </a>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {["Visa", "Mastercard", "МИР", "СБП"].map((m) => (
                    <span
                      key={m}
                      className="rounded-[5px] border border-rule px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink3"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <p className="mt-1.5 text-[12px] leading-[1.5] text-ink3">
                  Способ оплаты выберете на защищённой странице ЮKassa · Возврат в течение 3 дней
                </p>
              </div>
            </div>
          </div>

          {/* Левая колонка — сводка */}
          <div className="order-2 flex w-full flex-col lg:order-1 lg:w-[45%]">
            <div className={PANEL}>
              <span className="type-label">Ваш план</span>
              <p className="mt-1.5 text-[clamp(24px,2.4vw,32px)] font-light leading-none tracking-[-0.03em] text-ink">
                {planData.name}
              </p>

              <dl className="mt-3 flex flex-col gap-2 text-[14px]">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink3">Аккаунт</dt>
                  <dd className="text-right text-ink">
                    {gift ? "По ссылке-подарку" : email.trim() || "—"}
                  </dd>
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

              <hr className={`${DIVIDER} my-3`} />

              <span className="type-label">К оплате</span>
              <p className="mt-1.5 text-[clamp(22px,2.8vw,32px)] font-light leading-none tracking-[-0.03em] text-ink">
                {fmt(total)} ₽
              </p>
              <p className="mt-2 text-[12px] leading-[1.5] text-ink3">
                {gift
                  ? "Подписка на выбранный период · активируется по ссылке · без автопродления"
                  : `Следующее списание: ${nextChargeDate(periodData.months)} · ${fmt(total)} ₽`}
              </p>

              <hr className={`${DIVIDER} my-3`} />

              {/* Промокод */}
              <span className="type-label">Промокод</span>
              {promo ? (
                <div className="mt-2 inline-flex items-center gap-2 rounded-[8px] border border-gold2 bg-gold/[0.06] px-3 py-1.5 text-[13px] text-ink">
                  {promo.code} · −{Math.round(promo.discount * 100)}%
                  <button
                    type="button"
                    aria-label="Отменить промокод"
                    onClick={() => {
                      setPromo(null);
                      setPromoInput("");
                      setPromoError("");
                    }}
                    className="text-ink3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
                  >
                    <Icon icon="lucide:x" className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError("");
                      }}
                      placeholder="Введите промокод"
                      className={`h-11 min-w-0 flex-1 rounded-[6px] border bg-surface px-3.5 text-[14px] text-ink placeholder:text-ink3 outline-none transition-colors focus:border-gold2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                        promoError ? "border-red-500" : "border-rule"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="h-11 shrink-0 rounded-[6px] border border-ink px-4 text-[14px] text-ink transition-colors hover:border-gold2 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
                    >
                      Применить
                    </button>
                  </div>
                  {promoError && <p className="mt-1.5 text-[12px] text-red-600">{promoError}</p>}
                </>
              )}

              <hr className={`${DIVIDER} my-3`} />

              {/* Подарок другу */}
              {/* TODO backend: генерация подарочной ссылки после оплаты */}
              <div className="flex items-start gap-3">
                <Icon icon="lucide:gift" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div className="flex-1">
                  <p className="text-[14px] text-ink">Подарить подписку другу</p>
                  <p className="mt-1 text-[12px] leading-[1.5] text-ink3">
                    После оплаты вы получите ссылку — отправьте её другу в любой мессенджер
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={gift}
                  aria-label="Подарить подписку другу"
                  onClick={() => setGift((v) => !v)}
                  className={`relative mt-0.5 h-[22px] w-[40px] shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 ${
                    gift ? "bg-gold" : "bg-rule"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-surface shadow-sm transition-all ${
                      gift ? "left-[20px]" : "left-[2px]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LightLayout>
  );
}
