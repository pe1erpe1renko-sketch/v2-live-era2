const COLUMNS = [
  { title: "Сценарии", links: ["Старое фото", "Видео из фото", "Фото питомца", "Оживить рисунок"] },
  { title: "Нейросети", links: ["Kling 3.0", "Sora 2", "Veo 3.1", "Seedance 2.0"] },
  { title: "Сервис", links: ["Примеры", "Цены", "Блог", "FAQ"] },
  { title: "Документы", links: ["Оферта", "Возвраты", "Персональные данные", "Cookie"] },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-bg">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-[18px] font-light text-ink">Live Era2</span>
            <p className="type-body mt-6 max-w-[320px]">
              Нейросеть для оживления фотографий — онлайн, на русском, без VPN.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="type-label">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="rounded-[6px] text-[14px] text-ink2 transition-colors hover:text-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-rule2 pt-6">
          <span className="type-label">© 2026 Live Era</span>
          <a href="mailto:hello@liveera.ru" className="type-label rounded-[6px] hover:text-ink2">
            hello@liveera.ru
          </a>
        </div>
      </div>
    </footer>
  );
}
