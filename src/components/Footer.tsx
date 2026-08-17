import { Icon } from "@iconify/react";
import { AppLink } from "@/components/AppLink";
import { scenarioHref, modelHref } from "@/lib/links";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Сценарии",
    links: ["Старое фото", "Видео из фото", "Фото питомца", "Оживить рисунок"].map((label) => ({
      label,
      href: scenarioHref(label),
    })),
  },
  {
    title: "Нейросети",
    links: ["KLING 3.0", "Kling 3.0 Motion Control", "MiniMax H3", "Hedra", "Seedance 2.0"].map(
      (label) => ({
        label,
        href: modelHref(label),
      }),
    ),
  },
  {
    title: "Сервис",
    links: [
      { label: "Примеры", href: "/examples" },
      { label: "Цены", href: "/pricing" },
      { label: "Контакты", href: "/contacts" },
      { label: "Личный кабинет", href: "/account" },
    ],
  },
  {
    title: "Документы",
    links: [
      { label: "Оферта", href: "/offer" },
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Пользовательское соглашение", href: "/terms" },
      { label: "Согласие на обработку данных", href: "/consent" },
    ],
  },
];

const SOCIALS = [
  { icon: "simple-icons:telegram", label: "Telegram", href: "https://t.me/liveera" },
  { icon: "simple-icons:vk", label: "ВКонтакте", href: "https://vk.com/liveera" },
  { icon: "simple-icons:youtube", label: "YouTube", href: "https://youtube.com/@liveera" },
];

const linkClass =
  "group relative inline-block text-[14px] text-ink2 transition-colors duration-200 ease-slow hover:text-ink";

const underline = (
  <span
    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold2 transition-transform duration-200 ease-slow group-hover:scale-x-100 motion-reduce:hidden"
    aria-hidden="true"
  />
);

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={linkClass}>
        <span>{children}</span>
        {underline}
      </a>
    );
  }
  return (
    <AppLink href={href} className={linkClass}>
      <span>{children}</span>
      {underline}
    </AppLink>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <AppLink href="/" className="text-[18px] font-light text-ink">
              Live Era2
            </AppLink>
            <p className="type-body mt-6 max-w-[320px]">
              Нейросеть для оживления фотографий — онлайн, на русском, без VPN.
            </p>
            <div className="mt-5 text-[12px] leading-[1.5] text-ink3">
              <p>Индивидуальный предприниматель [ФИО]</p>
              <p className="mt-0.5">ИНН [номер] · ОГРНИП [номер]</p>
              <p className="mt-0.5">
                <FooterLink href="mailto:hello@liveera.ru">[адрес электронной почты]</FooterLink>
              </p>
            </div>

            <div className="mt-5 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[6px] text-ink3 transition-colors duration-200 ease-slow hover:text-gold"
                >
                  <Icon icon={s.icon} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="type-label">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
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
              <FooterLink href="/offer">Оферта</FooterLink>
              <FooterLink href="/privacy">Политика конфиденциальности</FooterLink>
            </div>
            <FooterLink href="mailto:hello@liveera.ru">hello@liveera.ru</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
