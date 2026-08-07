import { useState } from "react";
import { Icon } from "@iconify/react";

const NAV = [
  { label: "Сценарии", items: ["Старое фото", "Видео из фото", "Фото питомца"] },
  { label: "Нейросети", items: ["Kling 3.0", "Sora 2", "Veo 3.1"] },
  { label: "Примеры" },
  { label: "Цены" },
  { label: "Блог" },
] as const;

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 rounded-[6px]">
      <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-gold2">
        <span className="block h-[6px] w-[6px] bg-gold2" />
      </span>
      <span className="text-[18px] font-light text-ink">Live Era</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 rounded-[6px] text-[14px] text-ink2 transition-colors hover:text-ink"
              >
                {item.label}
                {"items" in item && item.items ? (
                  <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4 text-ink3" />
                ) : null}
              </button>
              {"items" in item && item.items && open === item.label ? (
                <div className="absolute left-0 top-full w-[220px] rounded-[6px] border border-rule bg-surface p-3 shadow-card">
                  {item.items.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block rounded-[6px] px-3 py-3 text-[14px] text-ink2 transition-colors hover:bg-gold3 hover:text-ink"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <a href="#" className="hidden rounded-[6px] text-[14px] text-ink2 hover:text-ink lg:block">
            Войти
          </a>
          <a
            href="#form"
            className="rounded-[6px] bg-gold px-6 py-3 text-[14px] text-surface transition-colors hover:bg-gold-dark"
          >
            <span className="hidden lg:inline">Создать видео</span>
            <span className="lg:hidden">Создать</span>
          </a>
          <span className="type-label hidden xl:block">RU · Без VPN</span>
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

      {menu ? (
        <div className="border-t border-rule bg-surface px-6 py-6 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.label}
              href="#"
              className="block rounded-[6px] py-3 text-[14px] text-ink2"
            >
              {item.label}
            </a>
          ))}
          <a href="#" className="block rounded-[6px] py-3 text-[14px] text-ink2">
            Войти
          </a>
          <span className="type-label mt-4 block">RU · Без VPN</span>
        </div>
      ) : null}
    </header>
  );
}
