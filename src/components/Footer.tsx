const COLUMNS = [
  { title: "Сценарии", links: ["Старое фото", "Видео из фото", "Фото питомца", "Оживить рисунок"] },
  { title: "Нейросети", links: ["Kling 3.0", "Sora 2", "Veo 3.1", "Seedance 2.0"] },
  { title: "Сервис", links: ["Примеры", "Цены", "Блог", "FAQ", "Контакты"] },
  { title: "Документы", links: ["Оферта", "Возвраты", "Персональные данные", "Cookie"] },
];

function FooterLink({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-block text-[14px] text-ink2 transition-colors duration-[2000ms] ease-slow hover:text-ink"
    >
      <span>{children}</span>
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold2 transition-transform duration-[2000ms] ease-slow group-hover:scale-x-100 motion-reduce:hidden"
        aria-hidden="true"
      />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-[18px] font-light text-ink">Live Era2</span>
            <p className="type-body mt-6 max-w-[320px]">
              Нейросеть для оживления фотографий — онлайн, на русском, без VPN.
            </p>
            <div className="mt-5 text-[12px] leading-[1.5] text-ink3">
              <p>Индивидуальный предприниматель [ФИО]</p>
              <p className="mt-0.5">ИНН [номер] · ОГРНИП [номер]</p>
              <p className="mt-0.5">
                <FooterLink href="mailto:[адрес электронной почты]">[адрес электронной почты]</FooterLink>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="type-label">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <FooterLink>{link}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-rule2 pt-6">
          <p className="text-[12px] text-ink3">
            Оплата картами российских банков. Чек приходит на почту после списания.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 text-[12px] text-ink3 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 LIVE ERA2</span>
            <div className="flex flex-wrap items-center gap-4">
              <FooterLink>Оферта</FooterLink>
              <FooterLink>Политика конфиденциальности</FooterLink>
            </div>
            <FooterLink href="mailto:hello@liveera.ru">hello@liveera.ru</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
