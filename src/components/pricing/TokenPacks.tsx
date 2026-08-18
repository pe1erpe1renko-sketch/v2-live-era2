import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { tokenWord } from "@/lib/plural";

type Pack = {
  name: string;
  tokens: string;
  price: string;
  perClip: string;
  featured?: boolean;
};

const PACKS: Pack[] = [
  { name: "Пробный", tokens: "115", price: "590", perClip: "от 49 ₽ за ролик" },
  { name: "Средний", tokens: "260", price: "1 290", perClip: "от 46 ₽ за ролик", featured: true },
  { name: "Большой", tokens: "760", price: "3 490", perClip: "от 42 ₽ за ролик" },
  { name: "Максимум", tokens: "1 700", price: "6 990", perClip: "от 37 ₽ за ролик" },
];

const COMMON = [
  "Токены не сгорают",
  "Все сценарии и нейросети",
  "Без автоматических списаний",
  "Без водяных знаков",
  "Возврат токенов при сбое",
  "Оплата российской картой, чек на почту",
];

// TODO backend: проверка email в профиле
const PROFILE_EMAIL: string | null = "user@example.com";

// TODO backend: сюда подставить платёжную ссылку магазина
const PAYMENT_URL = "https://yookassa.ru";

export function TokenPacks() {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(false), 8000);
    return () => clearTimeout(t);
  }, [notice]);

  const pay = () => {
    // TODO backend: проверка email в профиле
    if (!PROFILE_EMAIL) {
      setNotice(true);
      return;
    }
    window.location.href = PAYMENT_URL;
  };

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PACKS.map((p) => {
          const num = Number(String(p.tokens).replace(/\s/g, ""));
          const word = tokenWord(Number.isFinite(num) ? num : 0);
          return (
            <article
              key={p.name}
              className={`group relative flex flex-col gap-4 rounded-[16px] bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.16)] sm:flex-row sm:items-stretch sm:gap-0 ${
                p.featured ? "border border-gold2" : "border border-rule"
              }`}
            >
              {p.featured && (
                <span className="type-label absolute -top-3 left-6 z-10 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] text-white">
                  Покупают чаще
                </span>
              )}

              {/* Левая часть: объём + название */}
              <div className="flex flex-1 flex-col justify-between sm:pr-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[40px] font-light leading-none text-ink">
                    {p.tokens}
                  </span>
                  <span className="text-[15px] text-ink">{word}</span>
                </div>
                <div className="text-[13px] text-ink3">{p.name}</div>
              </div>

              {/* Вертикальный разделитель */}
              <div className="hidden w-px self-stretch bg-rule sm:block" />

              {/* Правая часть: цена + цена за ролик */}
              <div className="flex flex-col justify-between sm:px-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[40px] font-light leading-none text-gold">
                    {p.price}
                  </span>
                  <span className="text-[15px] text-gold">₽</span>
                </div>
                <div className="text-[13px] text-ink3">{p.perClip}</div>
              </div>

              {/* Кнопка */}
              <button
                type="button"
                onClick={pay}
                className={`mt-2 w-full rounded-[6px] px-6 py-3 text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 sm:mt-0 sm:w-auto sm:self-center sm:pl-6 ${
                  p.featured
                    ? "bg-gold text-white hover:bg-gold-dark"
                    : "border border-gold text-gold hover:bg-gold hover:text-white"
                }`}
              >
                Оплатить
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-[16px] border border-rule bg-surface p-6">
        <h3 className="text-[16px] font-normal text-ink">В любом пакете</h3>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON.map((t) => (
            <div key={t} className="flex items-start">
              <Icon
                icon="solar:check-circle-linear"
                width={16}
                height={16}
                className="mt-[2px] shrink-0 text-ink3"
              />
              <span className="ml-[10px] block text-[13px] leading-[1.4] text-ink2">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-[13px] text-ink3">
        Купили — потратили — докупили, когда нужно. Автоматических списаний нет.
      </p>

      {notice && (
        <div className="fixed bottom-5 right-5 z-50 w-[320px] rounded-[12px] border border-rule bg-surface p-4 shadow-card">
          <button
            type="button"
            onClick={() => setNotice(false)}
            aria-label="Закрыть"
            className="absolute right-3 top-3 text-ink3 transition-colors hover:text-ink"
          >
            <Icon icon="solar:close-circle-linear" width={16} height={16} />
          </button>
          <p className="pr-6 text-[14px] text-ink">Нужен email для чека</p>
          <p className="mt-1 pr-6 text-[13px] leading-[1.4] text-ink2">
            Добавьте адрес в профиль — на него придёт чек об оплате
          </p>
          <a
            href="/account"
            className="mt-3 inline-block rounded-[6px] border border-gold px-4 py-2 text-[13px] text-gold transition-colors hover:bg-gold hover:text-white"
          >
            В профиль
          </a>
        </div>
      )}
    </div>
  );
}
