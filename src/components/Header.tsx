import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SectionLabel } from "@/components/SectionLabel";
import { useAuth } from "@/context/AuthContext";
import { AccountMenu, TokenPill, ACCOUNT_LINKS } from "@/components/AccountMenu";
import archive1 from "@/assets/sc-archive-1.jpg";
import archive2 from "@/assets/sc-archive-2.jpg";
import archive3 from "@/assets/sc-archive-3.jpg";
import family1 from "@/assets/sc-family-1.jpg";
import family2 from "@/assets/sc-family-2.jpg";
import family3 from "@/assets/sc-family-3.jpg";
import draw1 from "@/assets/sc-draw-1.jpg";
import draw2 from "@/assets/sc-draw-2.jpg";
import draw3 from "@/assets/sc-draw-3.jpg";
import feed1 from "@/assets/sc-feed-1.jpg";
import feed2 from "@/assets/sc-feed-2.jpg";
import feed3 from "@/assets/sc-feed-3.jpg";
import portraitRestored from "@/assets/portrait-restored.jpg";

type Item = { title: string; img: string; badge?: string };

const SCENARIO_COLS: { label: string; items: Item[] }[] = [
  {
    label: "Архив",
    items: [
      { title: "Старое фото", img: archive1 },
      { title: "Фото к 9 Мая", img: archive2 },
      { title: "Встреча с собой в детстве", img: archive3, badge: "NEW" },
    ],
  },
  {
    label: "Близкие",
    items: [
      { title: "Портрет", img: family1 },
      { title: "Фото питомца", img: family2 },
      { title: "Подарок к юбилею", img: family3 },
    ],
  },
  {
    label: "Рисунки",
    items: [
      { title: "Детский рисунок", img: draw1 },
      { title: "Иллюстрация", img: draw2 },
      { title: "Картина", img: draw3 },
    ],
  },
  {
    label: "Лента",
    items: [
      { title: "Видео из фото", img: feed1 },
      { title: "Танец из кадра", img: feed2 },
      { title: "Видео из текста", img: feed3, badge: "NEW" },
    ],
  },
];

const MODELS: {
  letter: string;
  name: string;
  badge?: string;
  text: string;
}[] = [
  {
    letter: "K",
    name: "Kling 3.0",
    badge: "Чаще всего",
    text: "универсальная модель, держит мимику и мелкие детали",
  },
  {
    letter: "V",
    name: "Veo 3.1",
    text: "Google: звук в комплекте, есть 4K",
  },
  {
    letter: "S",
    name: "Seedance 2.0",
    badge: "Быстро",
    text: "ByteDance: считает быстрее и стоит дешевле",
  },
  {
    letter: "S",
    name: "Sora 2",
    text: "OpenAI: звук и синхронные губы сразу",
  },
  {
    letter: "W",
    name: "Wan 2.7",
    text: "Alibaba: плавные переходы между сценами",
  },
  {
    letter: "K",
    name: "Kling Motion Control",
    badge: "Эталон",
    text: "движение переносится с вашего видео-образца",
  },
  {
    letter: "H",
    name: "Hailuo 02",
    badge: "Эконом",
    text: "MiniMax: самый бережный расход токенов",
  },
  {
    letter: "G",
    name: "Grok Imagine",
    text: "xAI: свободные соотношения сторон",
  },
  {
    letter: "H",
    name: "Happy Horse",
    text: "Alibaba: 1080p со звуком",
  },
  { letter: "N", name: "Nano Banana 2", text: "до 14 референсов в одной сцене" },
];

const SIMPLE_LINKS_OUT = ["Примеры", "Цены"];
const SIMPLE_LINKS_IN = ["Мои генерации", "Цены"];

function Logo() {
  return (
    <a
      href="/"
      className="group relative inline-flex rounded-[6px] text-[18px] font-light text-ink"
    >
      <span>Live Era</span>
      <span
        className="inline-block transform transition-[transform,color] duration-200 ease-slow group-hover:-translate-y-1 group-hover:text-gold motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
      >
        2
      </span>
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-left transform scale-x-0 bg-gold2 transition-transform duration-200 ease-slow group-hover:scale-x-100 motion-reduce:hidden"
        aria-hidden="true"
      />
    </a>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-label rounded-full bg-gold3 px-2 py-[2px] text-[10px] text-gold">
      {children}
    </span>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-mega rounded-[16px] border border-rule bg-surface p-8 shadow-panel">
      {children}
    </div>
  );
}

function ScenarioCard({ it }: { it: Item }) {
  return (
    <a href="#form" className="group block overflow-hidden rounded-[6px]">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
        <img
          src={it.img}
          alt={it.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 ease-slow group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        {it.badge ? (
          <span className="absolute left-2 top-2">
            <Badge>{it.badge}</Badge>
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-[13px] font-normal leading-[1.3] text-ink line-clamp-2">
        {it.title}
      </p>
    </a>
  );
}

function ScenariosMenu() {
  return (
    <Panel>
      <div className="flex gap-8">
        <div className="grid w-[72%] grid-cols-4 gap-5">
          {SCENARIO_COLS.map((col) => (
            <div key={col.label}>
              <span className="type-label">{col.label}</span>
              <div className="mt-3 flex flex-col gap-4">
                {col.items.map((it) => (
                  <ScenarioCard key={it.title} it={it} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-[28%] border-l border-rule pl-8">
          <SectionLabel>Главный сценарий</SectionLabel>
          <div className="mt-3 rounded-[16px] border border-rule bg-surface p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
              <img
                src={portraitRestored}
                alt="Оживление фото"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-surface">
                <Icon icon="solar:play-linear" className="h-4 w-4 text-gold" />
              </span>
            </div>
            <p className="mt-3 text-[15px] text-ink">Оживление фото</p>
          </div>

          <a
            href="#form"
            className="mt-3 flex items-center gap-3 rounded-[16px] border border-rule p-4 transition-colors hover:border-gold2"
          >
            <Icon icon="solar:tuning-linear" className="h-5 w-5 shrink-0 text-gold2" />
            <span className="flex-1">
              <span className="block text-[14px] text-ink">Прямой доступ</span>
              <span className="block text-[12px] text-ink2">своя модель и свои настройки</span>
            </span>
            <span className="text-[14px] text-ink3">→</span>
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <p className="text-[13px] text-ink2">
          Не нашли нужное? Опишите сцену словами — нейросеть соберёт сценарий сама.
        </p>
        <a href="#form" className="rounded-[6px] text-[13px] text-gold">
          Все сценарии →
        </a>
      </div>
    </Panel>
  );
}

function ModelsMenu() {
  return (
    <Panel>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="flex flex-wrap items-baseline gap-2">
          <span className="text-[16px] text-ink">Модели напрямую</span>
          <span className="text-[13px] text-ink2">
            нативные настройки каждой модели открыты полностью
          </span>
        </p>
        <a href="#form" className="rounded-[6px] text-[13px] text-gold">
          Все модели →
        </a>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 xl:grid-cols-5">
        {MODELS.map((m) => (
          <a
            key={m.name}
            href="#form"
            className="rounded-[6px] border border-rule bg-surface p-4 transition-colors hover:border-gold2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-gold3 font-normal text-[16px] text-gold">
              {m.letter}
            </span>
            <span className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[14px] text-ink">{m.name}</span>
              {m.badge ? <Badge>{m.badge}</Badge> : null}
            </span>
            <span className="mt-1 block text-[12px] leading-[1.4] text-ink2">{m.text}</span>
          </a>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-[1.5] text-ink3">
        Названия и логотипы моделей принадлежат их правообладателям и указаны для обозначения
        совместимости.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <p className="text-[13px] text-ink2">
          Выбор не обязателен: в сценариях модель подбирается под задачу сама.
        </p>
        <span className="type-label">Обновляем в день релиза</span>
      </div>
    </Panel>
  );
}

export function Header() {
  const { isLoggedIn } = useAuth();
  const SIMPLE_LINKS = isLoggedIn ? SIMPLE_LINKS_IN : SIMPLE_LINKS_OUT;
  const [open, setOpen] = useState<"scenarios" | "models" | null>(null);
  const [menu, setMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const cancelClose = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), 200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const MEGA = [
    { id: "scenarios", label: "Сценарии" },
    { id: "models", label: "Нейросети" },
  ] as const;

  return (
    <header ref={wrapRef} className="sticky top-0 z-50 border-b border-rule bg-bg">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {MEGA.map((item) => (
            <button
              key={item.id}
              type="button"
              ref={(el) => {
                triggers.current[item.id] = el;
              }}
              aria-expanded={open === item.id}
              onMouseEnter={() => {
                cancelClose();
                setOpen(item.id);
              }}
              onMouseLeave={scheduleClose}
              onClick={() => setOpen((v) => (v === item.id ? null : item.id))}
              className={`flex items-center gap-1 rounded-[6px] text-[14px] transition-colors hover:text-ink ${
                open === item.id ? "text-ink" : "text-ink2"
              }`}
            >
              {item.label}
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={`h-4 w-4 text-ink3 transition-transform duration-300 ${
                  open === item.id ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
          {SIMPLE_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-[6px] text-[14px] text-ink2 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          {isLoggedIn ? (
            <TokenPill />
          ) : (
            <a
              href="#"
              className="hidden rounded-[6px] text-[14px] text-ink2 hover:text-ink lg:block"
            >
              Войти
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              const el = document.getElementById("hero-upload") as HTMLElement | null;
              el?.focus({ preventScroll: true });
            }}
            className="rounded-[6px] bg-gold px-6 py-3 text-[14px] text-surface transition-colors duration-200 ease-slow hover:bg-gold-dark"
          >
            <span className="hidden lg:inline">Создать видео</span>
            <span className="lg:hidden">Создать</span>
          </button>
          {isLoggedIn ? (
            <div className="hidden lg:block">
              <AccountMenu />
            </div>
          ) : null}
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setMenu((v) => !v)}
            className="rounded-[6px] p-1 text-ink2 lg:hidden"
          >
            <Icon icon="solar:hamburger-menu-linear" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="absolute left-0 right-0 top-full hidden px-6 pt-2 lg:block"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-[1440px] lg:px-2">
            {open === "scenarios" ? <ScenariosMenu /> : <ModelsMenu />}
          </div>
        </div>
      ) : null}

      {menu ? (
        <div className="border-t border-rule bg-surface px-6 py-6 lg:hidden">
          {isLoggedIn ? (
            <div className="mb-2 border-b border-rule pb-2">
              <div className="flex items-center py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold3 text-[15px] text-gold">
                  П
                </span>
                <span className="ml-3 min-w-0">
                  <span className="block truncate text-[14px] text-ink">Пользователь</span>
                  <span className="block truncate text-[12px] text-ink3">user@example.com</span>
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-rule py-3">
                <span className="flex items-center">
                  <span className="h-[6px] w-[6px] rounded-full bg-gold2" aria-hidden="true" />
                  <span className="ml-2 text-[14px] text-ink">0 токенов</span>
                </span>
                <button
                  type="button"
                  className="rounded-[6px] bg-gold px-[14px] py-[6px] text-[12px] text-white"
                >
                  Пополнить
                </button>
              </div>
            </div>
          ) : null}
          {[
            { label: "Сценарии", items: SCENARIO_COLS.flatMap((c) => c.items.map((i) => i.title)) },
            { label: "Нейросети", items: MODELS.map((m) => m.name) },
          ].map((group) => (
            <div key={group.label}>
              <button
                type="button"
                aria-expanded={mobileOpen === group.label}
                onClick={() => setMobileOpen((v) => (v === group.label ? null : group.label))}
                className="flex w-full items-center justify-between rounded-[6px] py-3 text-[14px] text-ink2"
              >
                {group.label}
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className={`h-4 w-4 text-ink3 transition-transform ${
                    mobileOpen === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileOpen === group.label ? (
                <div className="flex flex-col gap-1 pb-3 pl-3">
                  {group.items.map((t) => (
                    <a key={t} href="#form" className="rounded-[6px] py-2 text-[14px] text-ink">
                      {t}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {SIMPLE_LINKS.map((l) => (
            <a key={l} href="#" className="block rounded-[6px] py-3 text-[14px] text-ink2">
              {l}
            </a>
          ))}
          {isLoggedIn ? (
            <div className="mt-2 border-t border-rule pt-2">
              {ACCOUNT_LINKS.map((l) => (
                <a
                  key={l.label}
                  href="#"
                  className="flex items-center rounded-[6px] py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
                >
                  <Icon icon={l.icon} className="h-[18px] w-[18px] shrink-0 text-ink3" />
                  <span className="ml-3 text-[14px] text-ink">{l.label}</span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLoggedIn(false)}
                className="flex w-full items-center rounded-[6px] py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
              >
                <Icon
                  icon="solar:logout-2-linear"
                  className="h-[18px] w-[18px] shrink-0 text-ink3"
                />
                <span className="ml-3 text-[14px] text-ink2">Выйти</span>
              </button>
            </div>
          ) : (
            <a href="#" className="block rounded-[6px] py-3 text-[14px] text-ink2">
              Войти
            </a>
          )}
          <span className="type-label mt-4 block">RU · Без VPN</span>
        </div>
      ) : null}
    </header>
  );
}
